using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using CheckList.DataAccess;
using CheckList.Models;

namespace CheckList.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }


        [HttpGet]
        public bool CheckUniqueName(string name)
        {
            return DataList.Names.Contains(name);
        }
        [HttpPost]
        public void AddNameType(ViewModel model)
        {
            DataList.Names.Add(model.Name);
            DataList.Types.Add(model.Type);
        }

        [HttpGet]
        public bool CheckUniqueType(string name)
        {
            return DataList.Types.Contains(name);
        }

        [HttpGet]
        public JsonResult GetTypeList(string name)
        {
            return Json(DataList.Types.Where(w => w.ToLower().Contains(name)).Take(5), JsonRequestBehavior.AllowGet);
        }

    }
}