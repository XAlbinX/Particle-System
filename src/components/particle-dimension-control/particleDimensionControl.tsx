import React, { ChangeEvent } from 'react';
import { Box, TextField } from '@mui/material';
import { useParticleContext } from '../../contexts/particle.context';
import * as THREE from 'three';

const ParticleDimensionControl: React.FC = () => {
    const { particleDimensions, setParticleDimensions } = useParticleContext();

    const handleDimensionChange = (axis: 'x' | 'y' | 'z') => (event: ChangeEvent<HTMLInputElement>) => {
        const newDimension = parseFloat(event.target.value) || 0;
        setParticleDimensions((prevDimensions: THREE.Vector3) => {
            const updatedDimensions = new THREE.Vector3().copy(prevDimensions);
            updatedDimensions[axis] = newDimension;
            return updatedDimensions;
        });
    };
    console.log(particleDimensions);
    return (
        <Box style={{
            display: 'flex',
            justifyContent: 'space-between',
            gap: '10px',
            width: '100%', 
        }}>
            <TextField
                label="Particle Width"
                type="number"
                value={particleDimensions.x}
                onChange={handleDimensionChange('x')}
                size="small"
                variant="outlined"
                InputProps={{ style: { width: '180px' } }} 
            />
            <TextField
                label="Particle Height"
                type="number"
                value={particleDimensions.y}
                onChange={handleDimensionChange('y')}
                size="small"
                variant="outlined"
                InputProps={{ style: { width: '180px' } }}
            />
            <TextField
                label="Particle Depth"
                type="number"
                value={particleDimensions.z}
                onChange={handleDimensionChange('z')}
                size="small"
                variant="outlined"
                InputProps={{ style: { width: '180px' } }}
            />
        </Box> 
    );
};

export default ParticleDimensionControl;
