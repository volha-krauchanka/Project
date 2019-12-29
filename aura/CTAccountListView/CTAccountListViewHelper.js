/**
 * Created by vitek on 03.09.2019.
 */

({
    init : function(component) {
        var action = component.get("c.getAccList");
        action.setCallback(this,function(a){
            var state = a.getState();
            console.log(state);
            //check if result is successfull
            if(state == "SUCCESS"){
                console.log('a.getReturnValue', a.getReturnValue());
                component.set("v.AccList", a.getReturnValue());
            } else if(state == "ERROR"){
                alert('Error in calling server side action');
            }
        });
        $A.enqueueAction(action);
    },
    viewContactDetails : function(component, acc) {
        $A.createComponent(
            "c:CTContactListView",
            {
                'Account' : acc
            },
            function(newComponent, status, errorMessage){
                console.log('status:', status);
                if (status === "SUCCESS") {
                    var body = component.find("CTContactListView");
                    body.set("v.body", newComponent);
                }
                else if (status === "INCOMPLETE") {
                    console.log("No response from server or client is offline.")
                }
                else if (status === "ERROR") {
                    console.log("Error: " + errorMessage);
                }
            }
        );
    },
});