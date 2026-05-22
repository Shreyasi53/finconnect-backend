import { Notification } from "../models/notification.model.js";
const getNotifications = async (req, res) => {
   try {
      const notifications = await Notification.find({
         receiver: req.user._id
      })
      .populate("sender", "fullname username profileImage")
      .sort({ createdAt: -1 });
      return res.status(200).json({
         notifications
      });
   } catch (error) {
      return res.status(500).json({
         message: "Something went wrong",
         error: error.message
      });
   }
};

export {
   getNotifications
};