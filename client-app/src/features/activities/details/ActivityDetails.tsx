import { Button, Card, Image } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";
import { observer } from "mobx-react-lite";

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
        <Card fluid>
            <Image src={`/assets/categoryImages/${activity.category}.jpg`} wrapped ui={false} />
            <Card.Content>
                <Card.Header>
                    {activity.title}
                </Card.Header>
                <Card.Meta>
                    <span>{activity.date}</span>
                </Card.Meta>
                <Card.Description>
                    {activity.description}
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <Button.Group>
                    <Button as={Link} to={`/manage/${activity.id}`} basic color='blue' content='Edit'/>
                    <Button as={Link} to='/activities' basic color='grey' content='Cancel'/>
                </Button.Group>
            </Card.Content>
        </Card>
    )
})