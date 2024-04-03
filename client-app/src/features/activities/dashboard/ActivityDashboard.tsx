import { Grid } from "semantic-ui-react";
import ActivityList from "./ActivityList";
import ActivityDetails from "../details/ActivityDetails";
import ActivityForm from "../form/ActivityForm";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";



export default observer(function ActivityDashboard() {
    const { activityStore } = useStore();
    const { 
        activitiesByDate,
        editMode, 
        selectedActivity 
    } = activityStore;

    return (
        <Grid>
            <Grid.Column width='10'>
                <ActivityList activities={activitiesByDate} />
            </Grid.Column>
            <Grid.Column width='6'>
                {selectedActivity && <ActivityDetails /> }
                {editMode && <ActivityForm />
                }
            </Grid.Column>
        </Grid>
    )
})