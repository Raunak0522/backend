const planModal = require("../modal/planModal");


//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~CONTROLLER FUNCTIONS~~~~~~~~~~~~~~~~~~~~

async function getAllplansController(req, res) {
  try{
    let plans= await planModal.find();
    res.status(201).json({
        Allplans:plans
    });
  }catch (err){
    res.status(500).json({
        result:err.message
    })
}
}
async function createPlanController(req,res){
    try{
        let planObjdata = req.body;
        console.log(req.body);
        if(Object.keys(planObjdata).length > 0){
            let newplan= await planModal.create(planObjdata);
            res.status(201).json({
                result : "plan created",
                plan : newplan
            });
        }
        else{
            res.status(404).json({
                result:"data is incomplete"
            })
        }
    } catch (err){
        res.status(500).json({
            result:err.message
        })
    }

}
async function updatePlanController(req,res){
    try{
    let id=req.params.id;
    let plans= req.body;
    if(Object.keys(plans).length>0){
        let updatedPlan = await planModal.findOneAndUpdate(id,plans,{
            runValidators: true,
            new:true
        }) 
        res.status(200).json({
            plan:updatedPlan
        })
        console.log(updatedPlan)
    }
    else{
        res.status(404).json({
            result:"nothing to update"
        })
    }
    }
    catch(err){
        res.status(500).json({
            result:err.message
        })
    }

}
async function deletePlanController(req,res){
    try{
        let id=req.params.id;
        let plan=await planModal.findByIdAndDelete(id);
        res.status(200).json({
            plan:plan
        })
    }
    catch(err){
        res.status(500).json({
            results:err.message
        })
    }


}
async function getPlanController(req,res){
    try{
        let id=req.params.id;
        let plan=await planModal.findById(id);
        res.status(200).json({
            plan:plan
        })
    }
    catch(err){
        res.status(500).json({
            results:err.message
        })
    }

}



module.exports = {
  getAllplansController,
  createPlanController,
  updatePlanController,
  deletePlanController,
  getPlanController,
};
