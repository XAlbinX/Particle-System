import React, { ChangeEvent } from 'react';
import { Box, TextField } from '@mui/material';
import { useParticleContext } from '../../contexts/particle.context';

const ParticleLifespanControl: React.FC = () => {
    const { particleLifespan, setParticleLifespan } = useParticleContext();

    const handleLifespanChange = (type: 'min' | 'max') => (event: ChangeEvent<HTMLInputElement>) => {
        const value = parseFloat(event.target.value);
        if (!isNaN(value)) {
            setParticleLifespan((prevLifespan) => {
                const newLifespan = { ...prevLifespan, [type]: value };
                
                if (type === 'min' && value > prevLifespan.max) {
                    newLifespan.max = value;
                } else if (type === 'max' && value < prevLifespan.min) {
                    newLifespan.min = value;
                }
                
                return newLifespan;
            });
        }
    };

    return (
        <Box display="flex" justifyContent="space-between" alignItems="center" gap="220px">
            <TextField
                label="Min Lifespan (s)"
                type="number"
                value={particleLifespan.min}
                onChange={handleLifespanChange('min')}
                size="small"
                variant="outlined"
                InputProps={{
                    inputProps: { 
                        min: 1,
                        max: particleLifespan.max 
                    },
                    style: { width: '180px' } 
                }}
            />
            <TextField
                label="Max Lifespan (s)"
                type="number"
                value={particleLifespan.max}
                onChange={handleLifespanChange('max')}
                size="small"
                variant="outlined"
                InputProps={{
                    inputProps: { 
                        min: particleLifespan.min 
                    },
                    style: { width: '180px' } 
                }}
            />
        </Box>
    );
};

export default ParticleLifespanControl;
