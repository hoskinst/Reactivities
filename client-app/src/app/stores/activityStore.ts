import { makeAutoObservable, runInAction } from "mobx";
import { Activity } from "../models/activity";
import { v4 as uuid } from 'uuid';

import agent from "../api/agent";

export default class ActivityStore {
    activityRegistry = new Map<string, Activity>();
    editMode = false;
    loading = false;
    loadingInitial = true;
    selectedActivity: Activity | undefined = undefined;
    
    constructor() {
        makeAutoObservable(this)
    }

    get activitiesByDate() {
       return Array.from(this.activityRegistry.values()).sort((a, b) => 
       Date.parse(a.date) - Date.parse(b.date));
    }

    loadActivities = async () => {
        try {
            const fetchedActivities = await agent.Activities.list();
            runInAction(() => {
            fetchedActivities.forEach(activity => {
                activity.date = activity.date.split('T')[0];
                this.activityRegistry.set(activity.id, activity);
            })
            this.setLoadingInitial(false)
        })
        } catch(e) {
            console.log(e)
            this.setLoadingInitial(false)
        }
    }

    selectActivity = async (id: string) => {
        this.selectedActivity = this.activityRegistry.get(id);
    }

    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }

    cancelSelectedActivity = () => {
        this.selectedActivity = undefined;
    } 

    openForm = (id?: string) => {
        id ? this.selectActivity(id) : this.cancelSelectedActivity()
        this.editMode = true;
    }

    closeForm = () => {
        this.editMode = false;
    }
    
    createActivity = async (activity: Activity) => {
        this.loading = true;
        activity.id = uuid();
        try {
            agent.Activities.create(activity).then(() => {})
            runInAction(() => {
                this.activityRegistry.set(activity.id, activity);
                this.selectedActivity = activity;
                this.editMode = false;
                this.loading = false;
            })
        } catch (error) {
            console.log(error)
            runInAction(() => {
                this.loading = false
            })
        }
    }

    editActivity = async (activity: Activity) => {
        this.loading = true;
        try {
            agent.Activities.update(activity).then(() => {})
            runInAction(() => {
                this.activityRegistry.set(activity.id, activity);
                this.selectedActivity = activity;
                this.editMode = false;
                this.loading = false;
            })
        } catch (error) {
            console.log(error)
            runInAction(() => {
                this.loading = false
            })
        }
    }

    deleteActivity = async (id: string) => {
        this.loading = true
        try {
            await agent.Activities.delete(id);
            runInAction(() => {
                this.activityRegistry.delete(id);
                if (this.selectedActivity?.id === id) this.cancelSelectedActivity();
                this.loading = false;
            })

        } catch(error) {
            console.log(error)
            runInAction(() => {
                this.loading = false
            })
        }
    }
}