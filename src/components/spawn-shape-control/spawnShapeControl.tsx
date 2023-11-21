import React, { useState } from 'react';
import { FormControl, InputLabel, Select, MenuItem, SelectChangeEvent, TextField } from '@mui/material';
import { useParticleContext } from '../../contexts/particle.context';

const SpawnShapeControl: React.FC = () => {
    const { spawnShape, setSpawnShape, spawnShapeSize, setSpawnShapeSize } = useParticleContext();

    const handleShapeChange = (event: SelectChangeEvent<'sphere' | 'cube' | 'point'>) => {
        setSpawnShape(event.target.value as 'sphere' | 'cube' | 'point');
    };

    const handleSizeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newSize = parseFloat(event.target.value);
        if (!isNaN(newSize) && newSize >= 0) {
            setSpawnShapeSize(newSize);
        }
    };

    return (
        <div style={{ display: 'contents', gap: '50px', marginBottom: '10px' }}>
            <FormControl fullWidth>
                <InputLabel id="spawn-shape-select-label">Spawn Shape</InputLabel>
                <Select
                    labelId="spawn-shape-select-label"
                    value={spawnShape}
                    label="Spawn Shape"
                    size="small"
                    onChange={handleShapeChange}
                >
                    <MenuItem value="sphere">Sphere</MenuItem>
                    <MenuItem value="cube">Cube</MenuItem>
                    <MenuItem value="point">Point</MenuItem>
                </Select>
            </FormControl>
            <TextField
                label="Shape Size"
                type="number"
                value={spawnShapeSize}
                onChange={handleSizeChange}
                variant="outlined"
                size="small"
                InputProps={{ inputProps: { min: 0}, style: { width: '180px' }}} 
            />
        </div>
    );
};

export default SpawnShapeControl;
