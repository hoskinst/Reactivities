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
        this.setLoadingInitial(true);
        try {
            const fetchedActivities = await agent.Activities.list();
            runInAction(() => {
            fetchedActivities.forEach(activity => {
                this._setActivity(activity);
            })
            this.setLoadingInitial(false)
        })
        } catch(e) {
            console.log(e)
            this.setLoadingInitial(false)
        }
    }

    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
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
                this.loading = false;
            })

        } catch(error) {
            console.log(error)
            runInAction(() => {
                this.loading = false
            })
        }
    }

    loadActivity = async (id: string) => {
        let activity = this._getActivity(id)
        if (activity) {
            this.selectedActivity = activity
            return activity;
        } else {
            this.setLoadingInitial(true);
            try {
                activity = await agent.Activities.details(id);
                this.selectedActivity = activity;
                this._setActivity(activity);
                this.setLoadingInitial(false);
                return activity;
            } catch (e) {
                console.log(e);
                this.setLoadingInitial(false);
            }
        }
    }

    private _getActivity = (id: string) => {
        return this.activityRegistry.get(id);
    }

    private _setActivity = (activity: Activity) => {
        activity.date = activity.date.split('T')[0];
        this.activityRegistry.set(activity.id, activity);
    }
}