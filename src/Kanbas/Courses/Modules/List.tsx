import React, { useState } from "react";
import "./index.css";
import modules from "../../Database/modules.json";
import { FaEllipsisV, FaCheckCircle, FaPlusCircle } from "react-icons/fa";
import { useParams } from "react-router";

import { useSelector, useDispatch } from "react-redux";
import {
    addModule,
    deleteModule,
    updateModule,
    setModule,
} from "../Modules/reducer";

import {KanbasState} from "../../store";

function ModuleList() {
    const { courseId } = useParams();
    const moduleList = useSelector((state: KanbasState) =>
        state.modulesReducer.modules);
    const module = useSelector((state: KanbasState) =>
        state.modulesReducer.module);
    const dispatch = useDispatch();

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
                <div className="container">
                    <div className="input-container">
                        <input
                            className="input-padding"
                            value={module.name}
                            onChange={(e) => dispatch(setModule({ ...module, name: e.target.value }))}
                        />
                        <textarea
                            className="input-padding"
                            value={module.description}
                            onChange={(e) => dispatch(setModule({ ...module, description: e.target.value }))}
                        />
                    </div>
                    <div className="button-container">
                        <button
                            className="button-padding"
                            onClick={() => dispatch(addModule({ ...module, course: courseId }))}
                        >
                            Add
                        </button>
                        <button className="button-padding" onClick={() => dispatch(updateModule(module))}>
                            Update
                        </button>
                    </div>
                </div>
            </li>
            {moduleList
                .filter((module) => module.course === courseId)
                .map((module, index) => (
                    <li key={index} className="list-group-item">


                        <div className={"container"}>
                            <h3>{module.name}</h3>

                            <div>
                                <button className={"button-padding"}
                                        onClick={() => dispatch(setModule(module))}>
                                    Edit
                                </button>
                                <button className={"button-padding"}
                                        onClick={() => dispatch(deleteModule(module._id))}>
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