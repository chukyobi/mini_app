import User from "../models/userModel"; 

// Function to create a new user
export const createUser = async (userData: Partial<User>): Promise<User | null> => {
  try {
    const newUser = await User.create(userData as User);
    return newUser;
  } catch (error) {
    console.error("Error creating user:", error);
    return null;
  }
};



// Function to get user data from DB by userId
export const getUserDataFromDb = async (userId: string): Promise<User | null> => {
  try {
    const user = await User.findByPk(userId);
    return user;
  } catch (error) {
    console.error("Error fetching user data:", error);
    return null;
  }
};


// Function to get user by username
export const getUserByUsername = async (username: string): Promise<User | null> => {
  try {
    const user = await User.findOne({ where: { username } });
    return user;
  } catch (error) {
    console.error("Error fetching user by username:", error);
    return null;
  }
};


// Function to update a user
export const updateUser = async (usertelegramId: string, updates: Partial<User>): Promise<User | null> => {
  try {
    const [updated] = await User.update(updates, {
      where: { usertelegramId },
    });
    if (updated) {
      const updatedUser = await User.findByPk(usertelegramId);
      return updatedUser;
    }
    return null;
  } catch (error) {
    console.error("Error updating user:", error);
    return null;
  }
};


//Function to get all users by farmedPoints
export const getAllUsersSortedByPoints = async (): Promise<User[]> => {
  try {
    // Fetch all users sorted by totalfarmedPoints in DB in descending order
    const users = await User.findAll({
      order: [['farmedPoints', 'DESC']],
    });

    return users;
  } catch (error) {
    console.error('Error fetching users sorted by points:', error);
    throw new Error('Failed to fetch users sorted by points');
  }
};


export const updateUserLastLogin = async (userId: string) => {
  return await User.update({ lastLogin: new Date() }, { where: { usertelegramId: userId } });
};


// Function to start farming points for a user
export const startFarmingPoints = async (usertelegramId: string): Promise<void> => {
  try {
    const user = await User.findOne({ where: { usertelegramId } });

    if (!user) {
      throw new Error("User not found");
    }

    // your farming logic here
    // For now, we'll just simulate it with a delay
    // In a real application, you would likely use some background processing
    // library like Bull or agenda to handle this kind of task.

    const farmingDuration = 15 * 60 * 1000; // 15 minutes in milliseconds
    const pointsPerMinute = 10;
    const totalPoints = (farmingDuration / (60 * 1000)) * pointsPerMinute;

    setTimeout(async () => {
      try {
        user.farmedPoints += totalPoints;
        await user.save();
        console.log(`Farming completed for user ${usertelegramId}. Points earned: ${totalPoints}`);
      } catch (error) {
        console.error("Error updating farmed points after farming:", error);
      }
    }, farmingDuration);
  } catch (error) {
    console.error("Error starting farming points:", error);
    throw new Error("Failed to start farming points");
  }
};


// Function to claim points for a user
export const claimPoints = async (usertelegramId: string, points: number): Promise<User | null> => {
  try {
    const user = await User.findOne({ where: { usertelegramId } });

    if (!user) {
      throw new Error("User not found");
    }

    user.farmedPoints += points;
    await user.save();

    return user;
  } catch (error) {
    console.error("Error claiming points:", error);
    return null;
  }
};