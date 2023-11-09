import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { supabase } from "../createClient";

export const asyncUpDBFetch = createAsyncThunk(
  "visitWrite/asyncUpDBFetch",
  async () => {
    const data = await supabase
      .from("guestBook")
      .select("*")
      .order("id", { ascending: true });
    return data.data;
  }
);

// const processedEvents = new Set();

// export const subscribeToDBData = () => async (dispatch) => {
//   const channel = await supabase
//     .channel("schema-db-changes")
//     .on(
//       "postgres_changes",
//       { event: "*", schema: "public", table: "mytest" },
//       (payload) => {
//         if (processedEvents.has(payload.id)) {
//           return;
//         }
//         console.log("DBpayload", payload);
//         if (payload.eventType === "INSERT") {
//           dispatch(insertUserAsync(payload.new));
//         } else if (payload.eventType === "UPDATE") {
//           dispatch(updateUserAsync(payload.new));
//         } else if (payload.eventType === "DELETE") {
//           // dispatch(deleteUserAsync(payload.old));
//         }
//         processedEvents.add(payload.id);
//       }
//     )
//     .subscribe();
// };

const currentTimestamp = new Date().toISOString();

export const insertUserAsync = createAsyncThunk(
  "visitWrite/insertUser",
  async (userData) => {
    const data = {
      name: userData.username,
      password: userData.password,
      context: userData.write,
      timestamp: currentTimestamp,
    };
    await supabase.from("guestBook").insert(data);
    return data;
  }
);

export const updateUserAsync = createAsyncThunk(
  "visitWrite/updateContext",
  async (updateData) => {
    const data = await supabase
      .from("guestBook")
      .select("password")
      .eq("id", updateData.id);

    if (updateData.password === data.data[0].password) {
      await supabase
        .from("guestBook")
        .update({
          context: updateData.context,
        })
        .eq("id", updateData.id);
      return true;
    } else {
      return false;
    }
  }
);

export const deleteUserAsync = createAsyncThunk(
  "visitWrite/deleteUser",
  async (deleteUserInfo) => {
    console.log(deleteUserInfo.id);
    const data = await supabase
      .from("guestBook")
      .select("password")
      .eq("id", deleteUserInfo.id);
    if (deleteUserInfo.pw === data.data[0].password) {
      await supabase.from("guestBook").delete().eq("id", deleteUserInfo.id);
      return true;
    } else {
      return false;
    }
  }
);

const initialState = {
  array: [],
  status: "idle",
  error: null,
};

const writeSlice = createSlice({
  name: "visitWrite",
  initialState,
  reducers: {
    // addVisitWrite(state, action) {
    //   const existingUser = state.array.find(
    //     (item) => item.username === action.payload.username
    //   );
    //   if (!existingUser) {
    //     state.status = "loading";
    //   } else {
    //     return state;
    //   }
    // },
    // updateVisitWrite(state, action) {
    //   const findIndex = state.array.findIndex(
    //     (elem) => elem.id === action.payload.id
    //   );
    //   if (findIndex !== -1) {
    //     state.array[findIndex] = {
    //       ...state.array[findIndex],
    //       ...action.payload,
    //     };
    //   }
    // },
    // deleteVisitWrite(state, action) {
    //   state.array = state.array.filter(
    //     (value) => value.id !== action.payload.id
    //   );
    // },
  },
  extraReducers: (builder) => {
    //초기 DB불러오기
    builder.addCase(asyncUpDBFetch.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(asyncUpDBFetch.fulfilled, (state, action) => {
      state.array = action.payload;
      state.status = "complete";
    });
    builder.addCase(asyncUpDBFetch.rejected, (state, action) => {
      state.status = "fail";
      state.error = action.error.message;
    });

    //insert
    builder.addCase(insertUserAsync.pending, (state, action) => {
      console.log("insertUserAsync");
      state.status = "loading";
    });
    builder.addCase(insertUserAsync.fulfilled, (state, action) => {
      state.array.push(action.payload);
      state.status = "complete";
    });
    builder.addCase(insertUserAsync.rejected, (state, action) => {
      state.status = "fail";
      state.error = action.error.message;
    });

    //update
    builder.addCase(updateUserAsync.pending, (state, action) => {
      console.log("updateUSerAsync");
      state.status = "loading";
    });
    builder.addCase(updateUserAsync.fulfilled, (state, action) => {
      const updatedData = action.payload;
      const itemIndex = state.array.findIndex(
        (item) => item.id === updatedData.id
      );
      if (itemIndex !== -1) {
        state.array[itemIndex] = { ...state.array[itemIndex], ...updatedData };
      }
      state.status = "complete";
    });
    builder.addCase(updateUserAsync.rejected, (state, action) => {
      state.status = "fail";
      state.error = action.error.message;
    });

    //delete
    builder.addCase(deleteUserAsync.pending, (state, action) => {
      console.log("deleteUserAsync");
      state.status = "loading";
    });
    builder.addCase(deleteUserAsync.fulfilled, (state, action) => {
      const deletedId = action.payload;
      state.array = state.array.filter((item) => item.id !== deletedId);
      state.status = "complete";
    });
    builder.addCase(deleteUserAsync.rejected, (state, action) => {
      state.status = "fail";
      state.error = action.error.message;
    });
  },
});

export default writeSlice.reducer;
