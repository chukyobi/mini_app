import { DataTypes, Model} from "sequelize";
import sequelize from "../utils/db";


interface UserAttributes {
  usertelegramId: string;
  username: string | null;
  firstname: string | null;
  farmedPoints: number;
  walletAddress: string | null;
  profileImage: string | null;
  referralLink: string;
  completedTasks: string | null;
  numberofReferrals: string | null;
  dateCreated: Date;
  lastLogin: Date;
}

class User extends Model<UserAttributes> implements UserAttributes {
  public usertelegramId!: string;
  public username!: string | null;
  public firstname!: string | null;
  public farmedPoints!: number;
  public walletAddress!: string | null;
  public profileImage!: string | null;
  public referralLink!: string;
  public completedTasks!: string | null;
  public numberofReferrals!: string | null;
  public dateCreated!: Date;
  public lastLogin!: Date;
}

User.init(
  {
    usertelegramId: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true, // Make username field unique
    },
    firstname: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    farmedPoints: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    walletAddress: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    profileImage: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    referralLink: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    completedTasks: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    numberofReferrals: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    dateCreated: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    lastLogin: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: 'User', 
    tableName: "users",
    timestamps: false,
  }
);



export default User;
