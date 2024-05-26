import { JOBS } from "../../types/enums/Jobs.enum";
import { SECONDARY_JOBS } from "../../types/enums/Jobs.enum";

const jobMapping: { [key in JOBS]?: SECONDARY_JOBS[] } = {
    [JOBS.COOKER]: [SECONDARY_JOBS.BUTCHER, SECONDARY_JOBS.COOKER],
    [JOBS.HUNTER]: [SECONDARY_JOBS.FISHERMAN, SECONDARY_JOBS.TRAPPER],
    [JOBS.FARMER]: [SECONDARY_JOBS.GARDENER, SECONDARY_JOBS.HARVESTER],
    [JOBS.MINER]: [SECONDARY_JOBS.LUMBERJACK, SECONDARY_JOBS.MINER, SECONDARY_JOBS.QUARRY_WORKER],
    [JOBS.BUILDER]: [SECONDARY_JOBS.BUILDER, SECONDARY_JOBS.DECORATOR],
    [JOBS.DOCTOR]: [SECONDARY_JOBS.DOCTOR, SECONDARY_JOBS.NURSE, SECONDARY_JOBS.AMBULANCE],
    [JOBS.SCIENTIST]: [SECONDARY_JOBS.RESEARCHER, SECONDARY_JOBS.SCIENTIST],
    [JOBS.ENGINEER]: [SECONDARY_JOBS.TAILOR, SECONDARY_JOBS.MECHANIC, SECONDARY_JOBS.ELECTRICIAN, SECONDARY_JOBS.PLUMBER],
    [JOBS.ANIMALIST]: [SECONDARY_JOBS.ANIMALIST, SECONDARY_JOBS.TRAINER],
    [JOBS.GUARD]: [SECONDARY_JOBS.PATROL, SECONDARY_JOBS.WATCHMAN]
};

// get secondary jobs for a specific job
const getSecondaryJobs = (job: JOBS): SECONDARY_JOBS[] => {
    return jobMapping[job] || [];
};

// get all jobs with their corresponding secondary jobs
export const getAllJobs = (): { job: JOBS, secondaryJobs: SECONDARY_JOBS[] }[] => {
    return Object.values(JOBS).map((job: JOBS) => {
        return {
            job: job,
            secondaryJobs: getSecondaryJobs(job)
        };
    });
};