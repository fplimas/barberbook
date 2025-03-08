import React, { useState, useEffect } from 'react';
import { FaCalendarAlt, FaClock, FaSave, FaPlus, FaMinus, FaRegCalendarTimes, FaRegCalendarCheck } from 'react-icons/fa';
import './ScheduleManager.css';

const ScheduleManager = () => {
  const daysOfWeek = [
    { id: 0, name: 'Domingo' },
    { id: 1, name: 'Segunda' },
    { id: 2, name: 'Terça' },
    { id: 3, name: 'Quarta' },
    { id: 4, name: 'Quinta' },
    { id: 5, name: 'Sexta' },
    { id: 6, name: 'Sábado' }
  ];

  const [activeTab, setActiveTab] = useState('weekly');
  const [weeklySchedule, setWeeklySchedule] = useState({});
  const [blockedDates, setBlockedDates] = useState([]);
  const [newBlockDate, setNewBlockDate] = useState({ 
    startDate: '', 
    endDate: '', 
    reason: '',
    allDay: true,
    startTime: '09:00',
    endTime: '18:00'
  });
  const [loading, setLoading] = useState(true);
  const [saveStatus, setSaveStatus] = useState({ show: false, message: '', type: '' });

  // Inicializa horários padrão para todos os dias da semana
  useEffect(() => {
    setLoading(true);
    
    // Em um cenário real, estes dados viriam de uma API
    setTimeout(() => {
      const initialSchedule = {};
      daysOfWeek.forEach(day => {
        initialSchedule[day.id] = {
          isOpen: day.id !== 0, // Fechado aos domingos por padrão
          shifts: day.id !== 0 ? [
            { open: '09:00', close: '12:00' },
            { open: '13:00', close: '18:00' }
          ] : []
        };
      });
      
      setWeeklySchedule(initialSchedule);
      
      // Datas bloqueadas simuladas
      setBlockedDates([
        { 
          id: 1, 
          startDate: '2023-10-15', 
          endDate: '2023-10-15', 
          reason: 'Feriado local', 
          allDay: true 
        },
        { 
          id: 2, 
          startDate: '2023-10-20', 
          endDate: '2023-10-25', 
          reason: 'Férias', 
          allDay: true 
        }
      ]);
      
      setLoading(false);
    }, 1000);
  }, []);

  const handleDayToggle = (dayId) => {
    setWeeklySchedule({
      ...weeklySchedule,
      [dayId]: {
        ...weeklySchedule[dayId],
        isOpen: !weeklySchedule[dayId].isOpen
      }
    });
  };

  const handleShiftChange = (dayId, shiftIndex, field, value) => {
    const updatedShifts = [...weeklySchedule[dayId].shifts];
    updatedShifts[shiftIndex] = {
      ...updatedShifts[shiftIndex],
      [field]: value
    };
    
    setWeeklySchedule({
      ...weeklySchedule,
      [dayId]: {
        ...weeklySchedule[dayId],
        shifts: updatedShifts
      }
    });
  };

  const addShift = (dayId) => {
    const lastShift = weeklySchedule[dayId].shifts[weeklySchedule[dayId].shifts.length - 1];
    const newShift = { open: lastShift?.close || '09:00', close: '18:00' };
    
    setWeeklySchedule({
      ...weeklySchedule,
      [dayId]: {
        ...weeklySchedule[dayId],
        shifts: [...weeklySchedule[dayId].shifts, newShift]
      }
    });
  };

  const removeShift = (dayId, shiftIndex) => {
    const updatedShifts = weeklySchedule[dayId].shifts.filter((_, index) => index !== shiftIndex);
    
    setWeeklySchedule({
      ...weeklySchedule,
      [dayId]: {
        ...weeklySchedule[dayId],
        shifts: updatedShifts
      }
    });
  };

  const handleAddBlockedDate = () => {
    const newBlock = {
      id: blockedDates.length + 1,
      ...newBlockDate
    };
    
    setBlockedDates([...blockedDates, newBlock]);
    setNewBlockDate({ 
      startDate: '', 
      endDate: '', 
      reason: '',
      allDay: true,
      startTime: '09:00',
      endTime: '18:00'
    });
  };

  const removeBlockedDate = (id) => {
    setBlockedDates(blockedDates.filter(date => date.id !== id));
  };

  const handleSaveSchedule = () => {
    // Em um cenário real, enviaríamos os dados para a API
    setLoading(true);
    
    // Simular salvamento
    setTimeout(() => {
      setLoading(false);
      setSaveStatus({ 
        show: true, 
        message: 'Horários salvos com sucesso!', 
        type: 'success' 
      });
      
      // Esconder mensagem após 3 segundos
      setTimeout(() => {
        setSaveStatus({ show: false, message: '', type: '' });
      }, 3000);
    }, 1500);
  };

  const formatDateDisplay = (dateStr) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return date.toLocaleDateString('pt-BR');
  };

  if (loading) {
    return (
      <div className="schedule-manager loading">
        <div className="spinner"></div>
        <p>Carregando configurações de horário...</p>
      </div>
    );
  }

  return (
    <div className="schedule-manager">
      <div className="schedule-header">
        <h2><FaCalendarAlt /> Gerenciamento de Horários</h2>
        <button className="btn-save" onClick={handleSaveSchedule} disabled={loading}>
          <FaSave /> Salvar Alterações
        </button>
      </div>
      
      {saveStatus.show && (
        <div className={`save-status ${saveStatus.type}`}>
          {saveStatus.message}
        </div>
      )}
      
      <div className="schedule-tabs">
        <button 
          className={activeTab === 'weekly' ? 'active' : ''} 
          onClick={() => setActiveTab('weekly')}
        >
          Horário Semanal
        </button>
        <button 
          className={activeTab === 'special' ? 'active' : ''} 
          onClick={() => setActiveTab('special')}
        >
          Datas Especiais
        </button>
      </div>
      
      {activeTab === 'weekly' && (
        <div className="weekly-schedule">
          {daysOfWeek.map(day => (
            <div key={day.id} className={`day-schedule ${!weeklySchedule[day.id]?.isOpen ? 'closed' : ''}`}>
              <div className="day-header">
                <h3>{day.name}</h3>
                <label className="toggle-switch">
                  <input 
                    type="checkbox" 
                    checked={weeklySchedule[day.id]?.isOpen || false} 
                    onChange={() => handleDayToggle(day.id)}
                  />
                  <span className="toggle-slider"></span>
                  <span className="toggle-label">{weeklySchedule[day.id]?.isOpen ? 'Aberto' : 'Fechado'}</span>
                </label>
              </div>
              
              {weeklySchedule[day.id]?.isOpen && (
                <div className="shifts-container">
                  {weeklySchedule[day.id]?.shifts.map((shift, index) => (
                    <div key={index} className="shift-item">
                      <div className="time-inputs">
                        <div className="time-input-group">
                          <label>Abre</label>
                          <input 
                            type="time" 
                            value={shift.open}
                            onChange={(e) => handleShiftChange(day.id, index, 'open', e.target.value)}
                          />
                        </div>
                        <div className="divider">até</div>
                        <div className="time-input-group">
                          <label>Fecha</label>
                          <input 
                            type="time" 
                            value={shift.close}
                            onChange={(e) => handleShiftChange(day.id, index, 'close', e.target.value)}
                          />
                        </div>
                      </div>
                      
                      <button 
                        className="btn-remove-shift"
                        onClick={() => removeShift(day.id, index)}
                        disabled={weeklySchedule[day.id]?.shifts.length <= 1}
                      >
                        <FaMinus />
                      </button>
                    </div>
                  ))}
                  
                  <button className="btn-add-shift" onClick={() => addShift(day.id)}>
                    <FaPlus /> Adicionar Intervalo
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
      
      {activeTab === 'special' && (
        <div className="special-dates">
          <div className="blocked-dates-section">
            <h3>Datas Bloqueadas</h3>
            <p className="section-description">
              Configure feriados, férias ou outros períodos em que você não estará disponível.
            </p>
            
            <div className="add-blocked-container">
              <div className="form-row">
                <div className="form-group">
                  <label>Data Inicial</label>
                  <input 
                    type="date" 
                    value={newBlockDate.startDate}
                    onChange={(e) => setNewBlockDate({...newBlockDate, startDate: e.target.value})}
                  />
                </div>
                
                <div className="form-group">
                  <label>Data Final</label>
                  <input 
                    type="date" 
                    value={newBlockDate.endDate || newBlockDate.startDate}
                    onChange={(e) => setNewBlockDate({...newBlockDate, endDate: e.target.value})}
                    min={newBlockDate.startDate}
                  />
                </div>
              </div>
              
              <div className="form-group full-width">
                <label>Motivo</label>
                <input 
                  type="text" 
                  placeholder="Ex: Férias, Feriado, etc."
                  value={newBlockDate.reason}
                  onChange={(e) => setNewBlockDate({...newBlockDate, reason: e.target.value})}
                />
              </div>
              
              <div className="form-group checkbox-group">
                <label className="checkbox-container">
                  <input 
                    type="checkbox" 
                    checked={newBlockDate.allDay}
                    onChange={(e) => setNewBlockDate({...newBlockDate, allDay: e.target.checked})}
                  />
                  <span className="checkbox-label">Dia todo</span>
                </label>
              </div>
              
              {!newBlockDate.allDay && (
                <div className="form-row">
                  <div className="form-group">
                    <label>Hora Inicial</label>
                    <input 
                      type="time" 
                      value={newBlockDate.startTime}
                      onChange={(e) => setNewBlockDate({...newBlockDate, startTime: e.target.value})}
                    />
                  </div>
                  
                  <div className="form-group">
                    <label>Hora Final</label>
                    <input 
                      type="time" 
                      value={newBlockDate.endTime}
                      onChange={(e) => setNewBlockDate({...newBlockDate, endTime: e.target.value})}
                    />
                  </div>
                </div>
              )}
              
              <button 
                className="btn-add-block"
                onClick={handleAddBlockedDate}
                disabled={!newBlockDate.startDate || !newBlockDate.reason}
              >
                <FaPlus /> Adicionar Data Bloqueada
              </button>
            </div>
            
            <div className="blocked-dates-list">
              <h4>Períodos Bloqueados</h4>
              {blockedDates.length === 0 ? (
                <p className="no-blocks">Nenhuma data bloqueada.</p>
              ) : (
                blockedDates.map(block => (
                  <div key={block.id} className="blocked-date-item">
                    <div className="block-icon">
                      <FaRegCalendarTimes />
                    </div>
                    <div className="block-details">
                      <div className="block-period">
                        {formatDateDisplay(block.startDate)} 
                        {block.startDate !== block.endDate && ` até ${formatDateDisplay(block.endDate)}`}
                        {!block.allDay && ` (${block.startTime} - ${block.endTime})`}
                      </div>
                      <div className="block-reason">{block.reason}</div>
                    </div>
                    <button className="btn-remove-block" onClick={() => removeBlockedDate(block.id)}>
                      <FaMinus />
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ScheduleManager; 