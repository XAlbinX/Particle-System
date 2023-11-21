import React, { ChangeEvent } from 'react';
import { Box, TextField, Typography } from '@mui/material';
import { useParticleContext } from '../../contexts/particle.context';
import * as THREE from 'three';

const ParticleSpawnPositionControl: React.FC = () => {
    const { spawnPosition, setSpawnPosition } = useParticleContext();

    const handleSpawnPositionChange = (axis: 'x' | 'y' | 'z') => (event: ChangeEvent<HTMLInputElement>) => {
        const newPosition = parseFloat(event.target.value) || 0;
        setSpawnPosition((prevPosition) => {
            const updatedPosition = new THREE.Vector3().copy(prevPosition);
            updatedPosition[axis] = newPosition;
            return updatedPosition;
        });
    };

    return (
        <Box style={{
            display: 'flex',
            justifyContent: 'space-between',
            gap: '10px',
            width: '100%', 
        }}>
            <TextField
                label="Spawn Position X"
                type="number"
                value={spawnPosition.x}
                onChange={handleSpawnPositionChange('x')}
                size="small"
                variant="outlined"
                InputProps={{ style: { width: '180px' } }} 
            />
            <TextField
                label="Spawn Position Y"
                type="number"
                value={spawnPosition.y}
                onChange={handleSpawnPositionChange('y')}
                size="small"
                variant="outlined"
                InputProps={{ style: { width: '180px' } }}
            />
            <TextField
                label="Spawn Position Z"
                type="number"
                value={spawnPosition.z}
                onChange={handleSpawnPositionChange('z')}
                size="small"
                variant="outlined"
                InputProps={{ style: { width: '180px' } }}
            />
        </Box> 
    );
};

export default ParticleSpawnPositionControl;
