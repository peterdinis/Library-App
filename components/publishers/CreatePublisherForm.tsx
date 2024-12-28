"use client"

import { FC, FormEvent, useState } from "react";
import { Input, Button, Spacer, Switch } from "@nextui-org/react";
import Header from "../shared/Header";
import Editor from "../shared/Editor";

const CreatePublisherForm: FC = () => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState("");
    const [city, setCity] = useState("");
    const [isActive, setIsActive] = useState(true);
    const [createdDate, setCreatedDate] = useState("");

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        // Form submission logic here
    };

    return (
        <div className="max-w-4xl mx-auto p-6">
            <Header text="Nové vydavateľstvo" />
            <form onSubmit={handleSubmit} className="space-y-4 mt-6">
                {/* Form Inputs */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <Input
                            fullWidth
                            label="Názov"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <Input
                            fullWidth
                            label="Mesto"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            required
                        />
                    </div>
                </div>

                <Editor />
                
                <Input
                    label="Obrázok URL"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    fullWidth
                    required
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <Input
                            label="Dátum vytvorenia"
                            value={createdDate}
                            onChange={(e) => setCreatedDate(e.target.value)}
                            fullWidth
                            required
                        />
                    </div>
                    <div>
                        <span>Je aktívne vydavateľstvo</span>
                        <br />
                        <Switch
                            className="mt-5"
                            checked={isActive}
                            onChange={(e) => setIsActive(e.target.checked)}
                        />
                    </div>
                </div>

                <Spacer y={1} />
                
                <Button type="submit" color="primary" fullWidth>
                    Vytvoriť vydavateľstvo
                </Button>
            </form>
        </div>
    );
};

export default CreatePublisherForm;
