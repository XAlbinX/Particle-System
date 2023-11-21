import React, { ChangeEvent } from 'react';
import { Box, TextField } from '@mui/material';
import { useParticleContext } from '../../contexts/particle.context';
import * as THREE from 'three';

const ParticleSpeedControl: React.FC = () => {
    const { particleSpeed, setParticleSpeed } = useParticleContext();

    const handleSpeedChange = (axis: 'x' | 'y' | 'z') => (event: ChangeEvent<HTMLInputElement>) => {
        const newSpeed = Math.max(parseFloat(event.target.value) || 0, 0);
        const updatedSpeed = new THREE.Vector3().copy(particleSpeed);
        updatedSpeed[axis] = newSpeed;
        setParticleSpeed(updatedSpeed);
    };

    return (
        <Box style={{ display: 'flex', gap: '20px' }}>
            <TextField
                label="Speed X"
                type="number"
                value={particleSpeed.x}
                onChange={handleSpeedChange('x')}
                size="small"
                variant="outlined"
                inputProps={{ min: 0 }}
            />
            <TextField
                label="Speed Y"
                type="number"
                value={particleSpeed.y}
                onChange={handleSpeedChange('y')}
                size="small"
                variant="outlined"
                inputProps={{ min: 0 }}
            />
            <TextField
                label="Speed Z"
                type="number"
                value={particleSpeed.z}
                onChange={handleSpeedChange('z')}
                size="small"
                variant="outlined"
                inputProps={{ min: 0 }}
            />
        </Box>
    );
};

export default ParticleSpeedControl;
