import { Box, Button, Container, Paper } from '@mui/material';
import { useParticleContext } from '../../contexts/particle.context';
import ParticleMeshSizeControl from '../mesh-size-control/particleMeshSizeControl';
import ParticleSpawnPositionControl from '../spawn-position-control/particleSpawnPositionControl';
import ParticleDimensionControl from '../particle-dimension-control/particleDimensionControl';
import ParticleDirectionControl from '../particle-direction-control/particleDirectionControl';
import ParticleSpeedControl from '../particle-speed-control/particleSpeedControl';
import ParticleNumberControl from '../particle-number-control/particleNumberControl';
import ParticleLifespanControl from '../particle-lifespan-control/particleLifespanControl';
import ParticleGravityControl from '../particle-gravity-control/particleGravityControl';
import SpawnShapeControl from '../spawn-shape-control/spawnShapeControl';

const ControlPanel: React.FC = () => {

    const {
      isGenerating,
      setIsGenerating,
    } = useParticleContext();

    const startGenerating = () => {
      setIsGenerating(true);
    };
  
    const stopGenerating = () => {
      setIsGenerating(false);
    };
    
    return (
      <div style={{ position: 'absolute', top: '20px', left: '20px', zIndex: 1 }}>
            <Container maxWidth="sm" style={{ padding: 0 }}>
                  <Paper elevation={3} style={{
                    padding: '10px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '10px'
                  }}>
                    <ParticleMeshSizeControl/>
                    <ParticleSpawnPositionControl/>
                    <ParticleDimensionControl/>
                    <ParticleDirectionControl/>
                    <ParticleSpeedControl/>
                    <SpawnShapeControl/>
                    <ParticleLifespanControl/>
                    <ParticleNumberControl/>
                    <ParticleGravityControl/>                    
                    <Box style={{
                      display: 'flex',
                      width: '100%', 
                      justifyContent: 'space-between',
                      marginTop: '10px',
                    }}>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={startGenerating}
                            disabled={isGenerating}
                        >
                            Generate
                        </Button>
                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={stopGenerating}
                            disabled={!isGenerating}
                        >
                            Stop
                        </Button>
                    </Box>
                </Paper>
            </Container>
        </div>
  );
};

export default ControlPanel;
