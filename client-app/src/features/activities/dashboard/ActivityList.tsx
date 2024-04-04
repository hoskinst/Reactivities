import { Header } from "semantic-ui-react"
import { observer } from "mobx-react-lite";
import ActivityListItem from "./ActivityListItem";
import { useStore } from "../../../app/stores/store";
import { Fragment } from "react/jsx-runtime";

export default observer(function ActivityList() {
    const { activityStore } = useStore();
    return (
        <>
            {activityStore.groupedActivities.map(([group, activities]) => (
                <Fragment key={group}>
                    <Header sub color='teal'>{group}</Header>
                    {activities.map(activity => (
                        <ActivityListItem activity={activity}/>
                    ))}
                </Fragment>
            ))}
            
        </>
    )
})