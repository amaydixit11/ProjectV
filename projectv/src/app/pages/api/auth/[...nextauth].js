// pages/api/auth/[...nextauth].js
import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import dbConnect from "../../../lib/dbConnect";
import User from "../../../models/User";

export default NextAuth({
  providers: [
    Providers.Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorizationUrl:
        "https://accounts.google.com/o/oauth2/auth?prompt=consent&response_type=code&scope=openid%20email%20profile",
    }),
  ],
  callbacks: {
    async signIn(user, account, profile) {
      await dbConnect();
      if (user.email.endsWith("@iitbhilai.ac.in")) {
        const existingUser = await User.findOne({ email: user.email });
        if (!existingUser) {
          await User.create({
            name: user.name,
            email: user.email,
            sex: "",
            gender: "",
            crushes: [],
          });
        }
        return true;
      }
      return false;
    },
  },
});
