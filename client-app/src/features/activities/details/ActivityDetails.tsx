import { Grid } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import ActivityDetailedHeader from "./ActivityDetailedHeader";
import ActivityDetailedSideBar from "./ActivityDetailedSideBar";
import ActivityDetailedChat from "./ActivityDetailedChat";
import ActivityDetailedInfo from "./ActivityDetailedInfo";

export default observer(function ActivityDetails() {
    const { activityStore } = useStore();
    const { selectedActivity: activity, loadingInitial, loadActivity } = activityStore
    const { id } = useParams();

    useEffect(() => {
        if (id) {
            loadActivity(id);
        }
    }, [id, loadActivity])

    if (!activity || loadingInitial) return <LoadingComponent />;

    return (
      <Grid>
        <Grid.Column width={10}>
            <ActivityDetailedHeader activity={activity} />
            <ActivityDetailedInfo activity={activity} />
            <ActivityDetailedChat />
        </Grid.Column>
        <Grid.Column width={6}>
            <ActivityDetailedSideBar />
        </Grid.Column>    
      </Grid>
    )
})