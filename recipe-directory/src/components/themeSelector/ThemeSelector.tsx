import './ThemeSelector.css';
import modeIcon from '../../assets/mode-icon.svg';
import { useTheme } from '../../hooks/useTheme';

const themeColors = ['#58249c', '#249c6b', '#b70233'];

const ThemeSelector = () => {
  const theme = useTheme();

  const toggle = () => {
    theme?.changeMode(theme.mode === 'dark' ? 'light' : 'dark');
  };

  return (
    <div className='theme-selector'>
      <div className='mode-toggle'>
        <img
          src={modeIcon}
          onClick={toggle}
          style={{
            filter: theme?.mode === 'dark' ? 'invert(100%)' : 'invert(20%)',
          }}
          alt='theme toggle icon'
        />
      </div>
      <div className='theme-buttons'>
        {themeColors.map(color => (
          <div
            key={color}
            className='theme-buttons'
            style={{ background: color }}
            onClick={() => theme?.changeColor(color)}
          />
        ))}
      </div>
    </div>
  );
};

export default ThemeSelector;
