import { Grid } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";
import ActivityList from "./ActivityList";
import ActivityDetails from "../details/ActivityDetails";
import ActivityForm from "../form/ActivityForm";

interface Props {
    activities: Activity[],
    selectedActivity: Activity | undefined,
    selectActivity: (id: string) => void,
    cancelSelectedActivity: () => void,
    editMode: boolean,
    openForm: (id?: string) => void,
    closeForm: () => void,
    createOrEdit: (activity: Activity) => void,
    deleteActivity: (id: string) => void
}

export default function ActivityDashboard({ 
    activities,
    editMode,
    selectedActivity, 
    selectActivity, 
    cancelSelectedActivity,
    closeForm,
    deleteActivity,
    createOrEdit,
    openForm, }: Props) 
    {
    return (
        <Grid>
            <Grid.Column width='10'>
                <ActivityList activities={activities} selectActivity={selectActivity} deleteActivity={deleteActivity}/>
            </Grid.Column>
            <Grid.Column width='6'>
                {selectedActivity &&
                    <>
                        <ActivityDetails 
                            activity={selectedActivity} 
                            cancelSelectedActivity={cancelSelectedActivity} 
                            openForm={openForm}    
                        />
                    </>
                }
                {editMode && <ActivityForm createOrEdit={createOrEdit} closeForm={closeForm} activity={selectedActivity}/>}
            </Grid.Column>
        </Grid>
    )
}