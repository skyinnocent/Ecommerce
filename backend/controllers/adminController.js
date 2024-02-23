// imports
const Admin = require("../models/adminModel");
const Seller = require("./../models/sellerModel");
const {
  validateEmail,
  validatePassword,
  comparePassword,
} = require("./../utils/someUtils");

// controller
const adminController = {
  signupAdmin: async (req, res, next) => {
    let { name, email, password } = req.body;
    let newAdmin;
    try {
      // validate email and pass
      if (!validateEmail(email) || !validatePassword(password)) {
        res
          .status(404)
          .json({ message: "email or password did not match defined pattern" });
      }

      newAdmin = await Admin.create({ name, email, password });
    } catch (error) {
      console.error(error);
      if (error.code === 11000) {
        res.status(409).json({ message: "Admin exists with same email" });
        return;
      }
      res.status(400).json({ message: "Something went wrong" });
      return;
    }
    res.status(201).json(newAdmin);
  },
  signinAdmin: async (req, res, next) => {
    const { email, password } = req.body;
    try {
      const admin = await Admin.findOne({ email: email });
      if (!admin) {
        res.status(400).json({ message: "Wrong email" });
        return;
      }
      const comparedPassword = await comparePassword(password, admin.password);
      comparedPassword
        ? res.status(200).json({ message: "login successfull", payload: admin })
        : res.status(400).json({ message: "password mismatch" });
    } catch (error) {
      console.error(error);
      res.status(400).json({ message: "something whent wrong" });
    }
  },
  updatePassword: async (req, res, next) => {
    const { email, oldPassword, newPassword } = req.body;
    try {
      // testing if password is following pattern
      if (!validatePassword(newPassword)) {
        res.status(404).json({ message: "Password must follow the pattern" });
      }
      // querying admin
      const admin = await Admin.findOne({ email: email });
      // if admin is invalid below response
      if (!admin) {
        res.status(400).json({ message: "Wrong email" });
        return;
      }
      const comparedPassword = await comparePassword(
        oldPassword,
        admin.password
      );
      if (comparedPassword) {
        admin.password = newPassword;
        admin.save();
        res.status(201).json({ message: "password is changed successfully" });
      } else if (!comparedPassword) {
        res.status(409).json({ message: "Password mismatch" });
      }
    } catch (error) {
      console.error(error);
      res.status(200).json({ message: "Something went wrong" });
    }
  },
  delteAdmin: async (req, res, next) => {
    // REMEMBER: in frontend first signin will be checked then a delete page will open.
    const _id = req.params.id;
    try {
      console.log(_id);
      const deletedAdmin = await Admin.findByIdAndDelete(_id);
      if (!deletedAdmin) {
        res.status(400).json({ message: "Bad Request" });
      }
      res.status(204).end();
    } catch (error) {
      console.error(error);
    }
  },
  // This is a function which will get all sellers and the it will
  // populate all the sellers in three arrays One is pending another as active and the last as suspended.
  getSellerStatuses: async (req, res, next) => {
    try {
      const allSellers = await Seller.find();
      const categorizedSellers = {
        pending: [],
        active: [],
        suspended: [],
        deleteRequested: [],
      };

      allSellers.forEach((seller) => {
        switch (seller.status) {
          case "pending":
            categorizedSellers.pending.push(seller);
            break;
          case "active":
            categorizedSellers.active.push(seller);
            break;
          case "suspended":
            categorizedSellers.suspended.push(seller);
            break;
          case "delete-requested":
            categorizedSellers.deleteRequested.push(seller);
            break;
          default:
            break;
        }
      });

      res.status(200).json({ categorizedSellers });
    } catch (error) {
      console.error(error);
    }
  },
  activateSeller: async (req, res, next) => {
    const _id = req.params.id;
    try {
      // fetch One seller
      const seller = await Seller.findById(_id);
      if (!seller) {
        res.status(400).json({ message: "bad request" });
      }
      seller.status = "active";
      seller.save();
      // after activation send message
      res.status(201).json({ message: "seller is now activated" });
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: "something went wrong" });
    }
  },
  suspendSeller: async (req, res, next) => {
    const _id = req.params.id;
    try {
      // fetch One seller
      const seller = await Seller.findById(_id);
      if (!seller) {
        res.status(400).json({ message: "bad request" });
      }
      seller.status = "suspended";
      seller.save();
      // after activation send message
      res.status(201).json({ message: "seller is now suspended" });
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: "something went wrong" });
    }
  },
  deleteSeller: async (req, res, next) => {
    const _id = req.params.id;
    try {
      const deletedseller = await Seller.findByIdAndDelete(_id);
      if (!deletedseller) {
        res.status(400).json({ message: "Bad Request" });
      }
      res.status(204).end();
    } catch (error) {
      console.error(error);
    }
  },
  suspendCustomer: async (req, res, next) => {
    console.log(req.body);
  },
  getStats: async (req, res, next) => {
    // total active customer
    // total active sellers
    // total active orders
    // total returns
    // total transaction in rupees
    // total orders in transit
    console.log(req.body);
  },
};

module.exports = { adminController };
