const Editorials = require("../models/Editorials");
const Books = require("../models/Books");

exports.GetAdminEditorials = (req, res, next) => {

    Editorials.findAll({include: [{ model: Books }]}).then((result)=>{
  
      const editorials = result.map((result)=> result.dataValues)
  
      res.render("admin/editorials/admin-editorials",{
          pageTitle: "Editoriales",
          editorialsActive: true,
          editorials: editorials,
          hasEditorials: editorials.length > 0,
  
      });
  
  }).catch((er)=>{
  
      console.log(err);
  
  })
  };
  
    exports.GetRegisterEditorial = (req, res, next) => {
      res.render("admin/editorials/save-editorial", {
        pageTitle: "Registrar Editorial",
        editorialsActive: true,
      });
  };

  exports.PostRegisterEditorial = (req, res, next) => {
      const name = req.body.Name;
      const phone = req.body.Phone;
      const country = req.body.Country;
  
      Editorials.create({name: name, phone: phone, country: country}).then((result)=>{
          res.redirect("/admin-editorials");
      }).catch((err)=>{
          console.log(err);
      });
  
  };
  
  exports.GetEditEditorial = (req, res, next) => {
  
      const edit = req.query.edit;
      const id = req.params.EditorialId;
  
      if (!edit) {
        return res.redirect("/admin-editorials");
      }
  
      Editorials.findOne({where: {id: id}}).then((result)=>{
  
        const editorial = result.dataValues;
  
        if(!editorial){
  
          return res.redirect("/admin-editorials");
  
        }
  
        res.render("admin/editorials/save-editorial", {
          pageTitle: "Actualizar Editorial",
          editorialsActive: true,
          editMode: edit,
          editorial: editorial,
        });
  
      }).catch((err)=>{
        console.log(err);
      });
  
  };
  
  
  exports.PostEditEditorial = (req, res, next) => {
  
      const id = req.body.EditorialId;
      const name = req.body.Name;
      const phone = req.body.Phone;
      const country = req.body.Country
  
      Editorials.update({name: name, phone: phone, country: country}, {where: {id: id}}).then((result)=>{
  
        res.redirect("/admin-editorials")
  
      }).catch((err)=>{
        console.log(err);
      })
  
  };
  
  exports.PostDeleteEditorial = (req, res, next) => {
      const id = req.body.EditorialId;
  
      Editorials.destroy({where: {id: id}});
  
      res.redirect("/admin-editorials");
  };
  