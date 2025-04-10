'use client';

import { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Menu,
  Tabs,
  Tab,
  TextField,
  List,
  ListItemButton,
  Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useDispatch } from 'react-redux';
import { setPackage, setPackageClear } from '@/redux/slices';

interface PresetPackage {
  id: string;
  label: string;
  size: string;
  weight: string;
}

const presetPackages = [
  {
    id: 'envelope',
    label: 'Конверт',
    size: '34×27×2 см',
    weightLabel: 'до 0.5 кг',
    length: 34,
    width: 27,
    height: 2,
    weight: 0.5
  },
  {
    id: 'box_xs',
    label: 'Короб XS',
    size: '17×12×9 см',
    weightLabel: 'до 0.5 кг',
    length: 17,
    width: 12,
    height: 9,
    weight: 0.5
  },
  {
    id: 'box_s',
    label: 'Короб S',
    size: '23×19×10 см',
    weightLabel: 'до 2 кг',
    length: 23,
    width: 19,
    height: 10,
    weight: 2
  },
  {
    id: 'box_m',
    label: 'Короб M',
    size: '33×25×15 см',
    weightLabel: 'до 5 кг',
    length: 33,
    width: 25,
    height: 15,
    weight: 5
  },
  {
    id: 'box_l',
    label: 'Короб L',
    size: '31×25×38 см',
    weightLabel: 'до 12 кг',
    length: 31,
    width: 25,
    height: 38,
    weight: 12
  },
  {
    id: 'box_xl',
    label: 'Короб XL',
    size: '60×35×30 см',
    weightLabel: 'до 18 кг',
    length: 60,
    width: 35,
    height: 30,
    weight: 18
  },
  {
    id: 'suitcase',
    label: 'Чемодан',
    size: '55×35×77 см',
    weightLabel: 'до 30 кг',
    length: 55,
    width: 35,
    height: 77,
    weight: 30
  },
  {
    id: 'pallet',
    label: 'Паллета',
    size: '120×120×80 см',
    weightLabel: 'до 200 кг',
    length: 120,
    width: 120,
    height: 80,
    weight: 200
  }
];

export const PackageSelect = () => {
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [tabIndex, setTabIndex] = useState(0);
  const [selectedPreset, setSelectedPreset] = useState<string | null>(null);
  const [customSize, setCustomSize] = useState<{ length: string; width: string; height: string; weight: string, id: string }>({length: '', width: '', height: '', weight: '', id: ''});

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };

  const handlePresetSelect = (id: string) => {
    setSelectedPreset(id);
    handleClose();
  };

  useEffect(() => {
    const preset = presetPackages.find((p) => p.id === selectedPreset);
    if (preset) {
      setCustomSize({ length: String(preset.length), width: String(preset.width), height: String(preset.height), weight: String(preset.weight), id: preset.id });
    }
  }, [selectedPreset])

  const handleCustomChange = (field: keyof typeof customSize, value: string) => {
    setCustomSize((prev) => {
      if (!prev) {
        return { length: '', width: '', height: '', weight: '', id: '' };
      }
      return { ...prev, [field]: value, id: 'custom' };
    });
    setSelectedPreset(null);
  };

  useEffect(() => {
    if (customSize.length && customSize.width && customSize.height && customSize.weight && customSize.id) {
      dispatch(setPackage(customSize));
    }
  }, [customSize]);

  useEffect(() => {
    dispatch(setPackageClear());
  }, []);

  return (
    <Box>
      <Button onClick={handleOpen} variant="outlined" endIcon={<ExpandMoreIcon />}>
      {
        selectedPreset 
          ? presetPackages.find((p) => p.id === selectedPreset)?.label 
          : customSize.length && customSize.width && customSize.height && customSize.weight 
            ? `${customSize.length} x ${customSize.width} x ${customSize.height} см, до ${customSize.weight} кг` 
            : 'Выберите упаковку'
      }
      </Button>

      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        <Box sx={{ px: 2, width: 300 }}>
          <Tabs value={tabIndex} onChange={handleTabChange}>
            <Tab label="Примерно" />
            <Tab label="Точные" />
          </Tabs>
        </Box>

        {tabIndex === 0 && (
          <List>
            {presetPackages.map((pack) => (
              <ListItemButton
                key={pack.id}
                divider
                selected={pack.id === selectedPreset}
                onClick={() => handlePresetSelect(pack.id)}
              >
                <Box>
                  <Typography fontWeight="bold">{pack.label}</Typography>
                  <Typography variant="body2">{pack.size}, {pack.weightLabel}</Typography>
                </Box>
              </ListItemButton>
            ))}
          </List>
        )}

        {tabIndex === 1 && (
          <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', gap: 1 }}>
            <TextField
              label="Длина, см"
              value={customSize.length}
              onChange={(e) => handleCustomChange('length', e.target.value)}
              fullWidth
              size="small"
            />
            <TextField
              label="Ширина, см"
              value={customSize.width}
              onChange={(e) => handleCustomChange('width', e.target.value)}
              fullWidth
              size="small"
            />
            <TextField
              label="Высота, см"
              value={customSize.height}
              onChange={(e) => handleCustomChange('height', e.target.value)}
              fullWidth
              size="small"
            />
            <TextField
              label="Вес, кг"
              value={customSize.weight}
              onChange={(e) => handleCustomChange('weight', e.target.value)}
              fullWidth
              size="small"
            />
            <Button onClick={handleClose} variant="contained" sx={{ mt: 1 }}>
              Подтвердить
            </Button>
          </Box>
        )}
      </Menu>
    </Box>
  );
};
