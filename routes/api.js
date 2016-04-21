module.exports = function (app, express) {
  var apiRouter = express.Router();

  apiRouter.use(function (req, res, next) {
    next();
  });

  apiRouter.get('/', function (req, res) {
    res.json();
  });

  return apiRouter;
};
