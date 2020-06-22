import React from 'react'

const HomeController = () => {
    return (
        <>
            <h1>Home</h1>
            <p>This project was developed as a part of the continuous assesment for module CS615 - Internet Solutions, Department
            of Computer Science, Maynooth University. The project is a user study tool that incorporates users, tasks, and experiments.
            The app has authentication and implements 2 user scenarios:
            </p>
            <ul>
                <li>A researcher can create/edit/delete
                    a task (title, description, link to the platform where the task can be performed)</li>
                <li>
                    A researcher can
                    create/edit an experiment (title, description) and assign previously created tasks to the experiment
                </li>
            </ul>
            <p>
                The application was built using 3 main technologies :
            </p>
            <ul>
                <li>Database : MySQL</li>
                <li>Backend : Nodejs REST API</li>
                <li>Frontend : ReactJS + Redux</li>
            </ul>

        </>
    )
}

export default HomeController