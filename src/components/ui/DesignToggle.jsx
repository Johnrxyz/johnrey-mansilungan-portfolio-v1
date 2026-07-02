import React from 'react';
import { useDesign } from '../../context/DesignContext';

const DesignToggle = () => {
    const { designVersion, toggleDesign } = useDesign();

    return (
        <button
            id="design-toggle-btn"
            onClick={toggleDesign}
            title="Toggle between Classic and Terminal design"
            style={{
                position: 'fixed',
                bottom: '24px',
                right: '24px',
                zIndex: 9999,
                fontFamily: 'Inter, system-ui, sans-serif',
                fontSize: '13px',
                fontWeight: '600',
                letterSpacing: '0.01em',
                padding: '11px 18px',
                borderRadius: '999px',
                background: designVersion === 'v2' ? '#141414' : '#0a0a0a',
                color: designVersion === 'v2' ? '#f3f2ef' : '#a8ff3e',
                border: '1px solid',
                borderColor: designVersion === 'v2' ? '#141414' : '#a8ff3e',
                boxShadow: designVersion === 'v2'
                    ? '0 10px 30px -8px rgba(20,20,20,0.5)'
                    : '3px 3px 0 #a8ff3e',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
                userSelect: 'none',
            }}
            onMouseEnter={(e) => {
                if (designVersion === 'v2') {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 14px 34px -8px rgba(20,20,20,0.55)';
                } else {
                    e.currentTarget.style.transform = 'translate(-2px, -2px)';
                    e.currentTarget.style.boxShadow = '5px 5px 0 #a8ff3e';
                }
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translate(0, 0)';
                e.currentTarget.style.boxShadow = designVersion === 'v2'
                    ? '0 10px 30px -8px rgba(20,20,20,0.5)'
                    : '3px 3px 0 #a8ff3e';
            }}
        >
            {designVersion === 'v1' ? '[ switch → terminal ]' : '↺ Classic view'}
        </button>
    );
};

export default DesignToggle;
