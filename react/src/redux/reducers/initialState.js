export default {
    auth: {
        isAuthenticated: localStorage.jwtTokenUserStudy ? true : false,
        user: {}
    },
    experiments: [],
    selectedExperiment: {},
    tasks: [],
    selectedTask: {},
    apiCallsInProgress: 0,
}