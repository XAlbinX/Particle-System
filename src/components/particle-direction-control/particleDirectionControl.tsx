import React from 'react';
import { Box, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent} from '@mui/material';
import { useParticleContext } from '../../contexts/particle.context';
import * as THREE from 'three';

const ParticleDirectionControl: React.FC = () => {
    const { particleDirection, setParticleDirection } = useParticleContext();

    const handleDirectionChange = (axis: 'x' | 'y' | 'z') => (event: SelectChangeEvent<number>) => {
        const newDirectionValue = event.target.value as number; // Cast the value to number
        setParticleDirection((prevDirection) => {
            const updatedDirection = new THREE.Vector3().copy(prevDirection);
            updatedDirection[axis] = newDirectionValue;
            return updatedDirection;
        });
    };

    return (
        <Box style={{ display: 'flex', gap: '20px', alignItems: 'center'  }}>
            <FormControl size="small">
                <InputLabel id="direction-x-select-label">Direction X</InputLabel>
                <Select style={{width: '180px' }}
                    labelId="direction-x-select-label"
                    value={particleDirection.x}
                    label="Direction X"
                    onChange={handleDirectionChange('x')}
                >
                    <MenuItem value={-1}>-1</MenuItem>
                    <MenuItem value={0}>0</MenuItem>
                    <MenuItem value={1}>1</MenuItem>
                </Select>
            </FormControl>
            <FormControl size="small">
                <InputLabel id="direction-y-select-label">Direction Y</InputLabel>
                <Select style={{width: '180px' }}
                    labelId="direction-y-select-label"
                    value={particleDirection.y}
                    label="Direction Y"
                    onChange={handleDirectionChange('y')}
                >
                    <MenuItem value={-1}>-1</MenuItem>
                    <MenuItem value={0}>0</MenuItem>
                    <MenuItem value={1}>1</MenuItem>
                </Select>
            </FormControl>
            <FormControl size="small" >
                <InputLabel id="direction-z-select-label">Direction Z</InputLabel>
                <Select style={{width: '180px' }}
                    labelId="direction-z-select-label"
                    value={particleDirection.z}
                    label="Direction Z"
                    onChange={handleDirectionChange('z')}
                >
                    <MenuItem value={-1}>-1</MenuItem>
                    <MenuItem value={0}>0</MenuItem>
                    <MenuItem value={1}>1</MenuItem>
                </Select>
            </FormControl>
        </Box>
    );
};

export default ParticleDirectionControl;
