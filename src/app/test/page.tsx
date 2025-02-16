"use client"

import { NextPage } from "next";
import {
    usePlateEditor,
    Plate,
    PlateContent,
} from '@udecode/plate/react';

const TestPage: NextPage = () => {
    const editor = usePlateEditor();
    return (
        <Plate editor={editor}>
            <PlateContent placeholder="Type..." />
        </Plate>
    )
}

export default TestPage