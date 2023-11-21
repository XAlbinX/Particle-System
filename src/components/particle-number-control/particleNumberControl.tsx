import React, { ChangeEvent } from 'react';
import { TextField } from '@mui/material';
import { useParticleContext } from '../../contexts/particle.context';

const ParticleNumberControl: React.FC = () => {
    const { particleCount, setParticleCount } = useParticleContext();

    const handleParticleCountChange = (event: ChangeEvent<HTMLInputElement>) => {
        const newCount = parseInt(event.target.value, 10);
        if (!isNaN(newCount) && newCount > 0 && newCount <= 5000) {
            setParticleCount(newCount);
        }
    };

    return (
        <TextField
            label="Number of Particles"
            type="number"
            value={particleCount}
            onChange={handleParticleCountChange}
            size="small"
            variant="outlined"
            InputProps={{ inputProps: { min: 1,max: 5000},  style: { width: '180px' }}} 
        />
    );
};

export default ParticleNumberControl;
