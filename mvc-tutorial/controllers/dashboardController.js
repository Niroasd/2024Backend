export const dashboardView = (req, res) => {
    res.render("dashboard", {
      user: req.user
    });
  };