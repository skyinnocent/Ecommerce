// imports
const Seller = require("./../models/sellerModel");
const {
  validateEmail,
  validatePassword,
  comparePassword,
} = require("./../utils/someUtils");

// controller
const sellerController = {
  signupSeller: async (req, res, next) => {
    let { name, email, password } = req.body;
    let newSeller;
    try {
      // validate email and pass
      if (!validateEmail(email) || !validatePassword(password)) {
        res
          .status(404)
          .json({ message: "email or password did not match defined pattern" });
      }

      newSeller = await Seller.create({ name, email, password });
    } catch (error) {
      console.error(error);
      if (error.code === 11000) {
        res.status(409).json({ message: "seller exists with same email" });
        return;
      }
      res.status(400).json({ message: "Something went wrong" });
      return;
    }
    res.status(201).json(newSeller);
  },
  signinSeller: async (req, res, next) => {
    const { email, password } = req.body;
    try {
      const seller = await Seller.findOne({ email: email });
      console.log(seller);
      if (!seller) {
        res.status(400).json({ message: "Wrong email" });
        return;
      }
      const comparedPassword = await comparePassword(password, seller.password);
      comparedPassword
        ? res
            .status(200)
            .json({ message: "login successfull", payload: seller })
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
      // querying seller
      const seller = await Seller.findOne({ email: email });
      // if seller is invalid below response
      if (!seller) {
        res.status(400).json({ message: "Wrong email" });
        return;
      }
      const comparedPassword = await comparePassword(
        oldPassword,
        seller.password
      );
      if (comparedPassword) {
        seller.password = newPassword;
        seller.save();
        res.status(201).json({ message: "password is changed successfully" });
      } else if (!comparedPassword) {
        res.status(409).json({ message: "Password mismatch" });
      }
    } catch (error) {
      console.error(error);
      res.status(200).json({ message: "Something went wrong" });
    }
  },
  delteSeller: async (req, res, next) => {
    // REMEMBER: in frontend first signin will be checked then a delete page will open.
    const _id = req.params.id;
    try {
      console.log(_id);
      const deletedseller = await Seller.findById(_id);
      if (!deletedseller) {
        res.status(400).json({ message: "Bad Request" });
      }
      deletedseller.status = "delete-requested";
      const response = await deletedseller.save();
      res.status(201).json({ message: "delete-requested" });
    } catch (error) {
      console.error(error);
    }
  },
  // implement functionalities like update list product and list update product
};

module.exports = { sellerController };
