import { Notification } from "../models/notification.model.js";

// GET NOTIFICATIONS
const getNotifications = async (req, res) => {
   try {
      const notifications = await Notification.find({receiver: req.user._id})
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

// MARK NOTIFICATION AS READ
const markAsRead = async (req, res) => {
   try {
      const notification = await Notification.findById(
         req.params.id
      );
      if (!notification) {
         return res.status(404).json({
            message: "Notification not found"
         });
      }
      // ownership check
      if (notification.receiver.toString() !== req.user._id.toString()){
         return res.status(403).json({
            message: "Unauthorized action"
         });
      }
      notification.isRead = true;
      await notification.save();
      return res.status(200).json({
         message: "Notification marked as read",
         notification
      });

   } catch (error) {
      return res.status(500).json({
         message: "Something went wrong",
         error: error.message
      });
   }
};

export {
   getNotifications,
   markAsRead
};