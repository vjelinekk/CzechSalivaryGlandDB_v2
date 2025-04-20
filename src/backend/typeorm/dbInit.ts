import { app } from 'electron'
import path from 'path'

import { DataSource } from "typeorm";
import { BenignPatient } from '../entities/benign-patient.entity';
import { IsInStudy } from '../entities/is-in-study.entity';
import { MalignantParotidSpecific } from '../entities/malignant-parotid-specific.entity';
import { MalignantPatient } from '../entities/malignant-patient.entity';
import { MalignantSubmandibularSpecific } from '../entities/malignant-submandibular-specific.entity';
import { Password } from '../entities/password.entity';
import { Patient } from "../entities/patient.entity";
import { Study } from '../entities/study.entity';

const getDBPath = (filename: string): string => {
    let base = app.getAppPath()
    if (app.isPackaged) {
        base = base.replace(`${path.sep}app.asar`, '')
    }
    return path.resolve(base, `${filename}.sqlite`)
}

export const AppDataSource = new DataSource({
    type: "sqlite",
    database: getDBPath('db'),
    synchronize: true,
    logging: false,
    entities: [
        Patient,
        MalignantPatient,
        BenignPatient,
        MalignantParotidSpecific,
        MalignantSubmandibularSpecific,
        Study,
        IsInStudy,
        Password
    ],
})

AppDataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })
    .catch((err) => {
        console.error("Error during Data Source initialization", err)
    })
