import React from 'react';
import Box from '@mui/material/Box'; // Corrected import
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { useParticleContext } from '../../contexts/particle.context';

const ParticleGravityControl: React.FC = () => {
    const { isApplyingGravity, setisApplyingGravity } = useParticleContext();

    const handleGravityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setisApplyingGravity(event.target.checked);
    };

    return (
        <Box>
            <FormControlLabel
                control={
                    <Switch
                        checked={isApplyingGravity}
                        onChange={handleGravityChange}
                        name="gravityToggle"
                        color="primary"
                    />
                }
                label="Gravity"
            />
        </Box>
    );
};

export default ParticleGravityControl;
