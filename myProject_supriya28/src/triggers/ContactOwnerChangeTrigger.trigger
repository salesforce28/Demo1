trigger ContactOwnerChangeTrigger on Contact (after update) {
    
    ProgramFlowExperiment pf = new ProgramFlowExperiment();
    pf.HandleContactUpdateTrigger(Trigger.new, Trigger.oldMap);

}