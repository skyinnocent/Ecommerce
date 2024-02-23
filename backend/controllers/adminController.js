const adminController = {
  signupAdmin: async (req, res, next) => {
    console.log(req.body);
    res.status(200).end();
  },
  signinAdmin: async (req, res, next) => {
    console.log(req.body);
  },
  updatePassword: async (req, res, next) => {
    console.log(req.body);
  },
  delteAdmin: async (req, res, next) => {
    console.log(req.body);
  },
  approveSeller: async (req, res, next) => {
    console.log(req.body);
  },
  suspendSeller: async (req, res, next) => {
    console.log(req.body);
  },
  suspendCustomer: async (req, res, next) => {
    console.log(req.body);
  },
  getStats: async (req, res, next) => {
    console.log(req.body);
  },
};

module.exports = { adminController };
