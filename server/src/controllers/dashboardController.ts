import { Request, Response } from "express";
import { getAllUsersSortedByPoints, getUserDataFromDb, claimPoints} from "../services/userServices";

import User from "../models/userModel";


export const dashboardUser = async (req: Request, res: Response) => {
  const userId = req.query.userId as string;

  if (!userId) {
    return res.status(400).json({ error: "User session not found" });
  }

 
  try {
    // Fetch the logged-in user's data
    const loggedInUser: User | null = await getUserDataFromDb(userId);

    if (!loggedInUser) {
      return res.status(404).json({ error: "User not found" });
    }

    // Prepare response data for the logged-in user
    const userData = {
      userId: loggedInUser.usertelegramId,
      firstname: loggedInUser.firstname,
      username: loggedInUser.username,
      farmedPoints: loggedInUser.farmedPoints,
      walletAddress: loggedInUser.walletAddress,
      profileImage: loggedInUser.profileImage,
    };

    // Fetch all users sorted by farmedPoints in descending order
    const topUsers: User[] = await getAllUsersSortedByPoints();

    // Prepare response data for dashboard (all users)
    const leaderboardData = topUsers.slice(0, 4).map((user) => ({
      userId: user.usertelegramId,
      firstname: user.firstname,
      username: user.username,
      farmedPoints: user.farmedPoints,
      profileImage: user.profileImage
    }));

    // Return response with both user data and dashboard data
    return res.json({ userData, leaderboardData });

  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};











