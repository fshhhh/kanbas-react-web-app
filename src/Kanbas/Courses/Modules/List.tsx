import React, { useEffect, useState } from "react";
import "./index.css";
import { useParams } from "react-router";

import { useSelector, useDispatch } from "react-redux";
import {
    addModule,
    deleteModule,
    updateModule,
    setModule,
    setModules,
} from "../Modules/reducer";
import * as client from "./client";
import {KanbasState} from "../../store";

function ModuleList() {
    const { courseId } = useParams();
    useEffect(() => {
        client.findModulesForCourse(courseId)
            .then((modules) =>
                dispatch(setModules(modules))
            );
    }, [courseId]);

    const moduleList = useSelector((state: KanbasState) =>
        state.modulesReducer.modules);
    const module = useSelector((state: KanbasState) =>
        state.modulesReducer.module);

    const dispatch = useDispatch();
    const handleAddModule = () => {
        client.createModule(courseId, module).then((module) => {
            dispatch(addModule(module));
        });
    };
    const handleDeleteModule = (moduleId: string) => {
        client.deleteModule(moduleId).then((status) => {
            dispatch(deleteModule(moduleId));
        });
    };
    const handleUpdateModule = async () => {
        const status = await client.updateModule(module);
        dispatch(updateModule(module));
    };




    return (
        <div>
            <div className="button">
                <select className="form-select button-dropdown">
                    <option selected>Publish All</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                </select>
                <button type="button" className="button-padding">Collapse</button>
                <button type="button" className="wd-fg-color-red button-padding">+ Module</button>
            </div>

        <ul className="list-group margin-top">
            <li className="list-group-item">
                <div>
                        <input
                            className="input-padding float-start"
                            value={module.name}
                            onChange={(e) => dispatch(setModule({ ...module, name: e.target.value }))}
                        />
                </div>
                <div>
                        <textarea
                            className="input-padding float-start"
                            value={module.description}
                            onChange={(e) => dispatch(setModule({ ...module, description: e.target.value }))}
                        />

                    <div className="button-container float-end">
                        <button
                            className="button-padding"
                            onClick={handleAddModule}>
                        Add
                        </button>
                        <button className="button-padding" onClick={handleUpdateModule}>
                            Update
                        </button>
                    </div>
                    </div>
            </li>
            {moduleList
                .filter((module) => module.course === courseId)
                .map((module, index) => (
                        <li key={index} className="list-group-item greenbar">
                            <div>
                                <h3>{module.name}</h3>
                                <div>
                                    <button className={"button-padding float-end"}
                                            onClick={() => dispatch(setModule(module))}>
                                        Edit
                                    </button>
                                    <button className={"button-padding float-end"}
                                            onClick={() => handleDeleteModule(module._id)} >
                                        Delete
                                    </button>
                                </div>
                            </div>
                            <p>{module.description}</p>
                        </li>
                ))}
            </ul>
        </div>


    );
}
export default ModuleList;