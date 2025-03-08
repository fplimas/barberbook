import React, { useState, useEffect } from 'react';
import { FaBox, FaPlus, FaMinus, FaTrash, FaPen, FaSave, FaTimes, FaExclamationTriangle, FaSearch } from 'react-icons/fa';
import './InventoryManager.css';

const InventoryManager = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingProduct, setEditingProduct] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [saveStatus, setSaveStatus] = useState({ show: false, message: '', type: '' });
  const [showAddForm, setShowAddForm] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    alertThreshold: '',
    category: '',
    brand: '',
  });

  // Listagem de categorias de produtos
  const categories = [
    'Cuidados com Cabelo',
    'Cuidados com Barba',
    'Produtos de Styling',
    'Acessórios',
    'Kits',
    'Outros'
  ];

  useEffect(() => {
    // Em um cenário real, estes dados viriam de uma API
    setTimeout(() => {
      const demoProducts = [
        {
          id: 1,
          name: 'Pomada Modeladora',
          description: 'Pomada para modelagem de cabelo com fixação forte',
          price: 45.90,
          stock: 24,
          alertThreshold: 5,
          category: 'Produtos de Styling',
          brand: 'BarberTech',
          image: 'https://images.unsplash.com/photo-1597853064779-64c8a6746e18?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&h=400'
        },
        {
          id: 2,
          name: 'Óleo para Barba',
          description: 'Óleo hidratante para barba com aroma de madeira',
          price: 32.50,
          stock: 3,
          alertThreshold: 5,
          category: 'Cuidados com Barba',
          brand: 'BeardMaster',
          image: 'https://images.unsplash.com/photo-1622025320187-28017ba3cd22?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&h=400'
        },
        {
          id: 3,
          name: 'Pente de Barba',
          description: 'Pente especial para barba, em madeira',
          price: 18.00,
          stock: 15,
          alertThreshold: 3,
          category: 'Acessórios',
          brand: 'BarberPro',
          image: 'https://images.unsplash.com/photo-1621607514922-48324ffa4467?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&h=400'
        },
        {
          id: 4,
          name: 'Shampoo Masculino',
          description: 'Shampoo específico para cabelos masculinos',
          price: 28.90,
          stock: 10,
          alertThreshold: 4,
          category: 'Cuidados com Cabelo',
          brand: 'BarberTech',
          image: 'https://images.unsplash.com/photo-1573875133362-0b9e43b7c62d?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&h=400'
        },
        {
          id: 5,
          name: 'Kit Barba e Cabelo',
          description: 'Kit completo com produtos para barba e cabelo',
          price: 99.90,
          stock: 7,
          alertThreshold: 2,
          category: 'Kits',
          brand: 'BeardMaster',
          image: 'https://images.unsplash.com/photo-1599751449657-1a2275094f07?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&h=400'
        }
      ];
      
      setProducts(demoProducts);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.brand.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddProduct = () => {
    if (!newProduct.name || !newProduct.price || !newProduct.stock) {
      setSaveStatus({
        show: true,
        message: 'Preencha os campos obrigatórios: Nome, Preço e Estoque',
        type: 'error'
      });
      return;
    }

    const productToAdd = {
      ...newProduct,
      id: products.length ? Math.max(...products.map(p => p.id)) + 1 : 1,
      price: parseFloat(newProduct.price),
      stock: parseInt(newProduct.stock),
      alertThreshold: parseInt(newProduct.alertThreshold) || 1
    };

    setProducts([...products, productToAdd]);
    setShowAddForm(false);
    setNewProduct({
      name: '',
      description: '',
      price: '',
      stock: '',
      alertThreshold: '',
      category: '',
      brand: '',
    });

    setSaveStatus({
      show: true,
      message: 'Produto adicionado com sucesso!',
      type: 'success'
    });

    setTimeout(() => setSaveStatus({ show: false, message: '', type: '' }), 3000);
  };

  const startEditing = (product) => {
    setEditingProduct({
      ...product,
      price: product.price.toString(),
      stock: product.stock.toString(),
      alertThreshold: product.alertThreshold.toString()
    });
  };

  const cancelEditing = () => {
    setEditingProduct(null);
  };

  const saveEditing = () => {
    if (!editingProduct.name || !editingProduct.price || !editingProduct.stock) {
      setSaveStatus({
        show: true,
        message: 'Preencha os campos obrigatórios: Nome, Preço e Estoque',
        type: 'error'
      });
      return;
    }

    const updatedProduct = {
      ...editingProduct,
      price: parseFloat(editingProduct.price),
      stock: parseInt(editingProduct.stock),
      alertThreshold: parseInt(editingProduct.alertThreshold) || 1
    };

    setProducts(products.map(p => p.id === updatedProduct.id ? updatedProduct : p));
    setEditingProduct(null);

    setSaveStatus({
      show: true,
      message: 'Produto atualizado com sucesso!',
      type: 'success'
    });

    setTimeout(() => setSaveStatus({ show: false, message: '', type: '' }), 3000);
  };

  const deleteProduct = (productId) => {
    if (window.confirm('Tem certeza que deseja excluir este produto?')) {
      setProducts(products.filter(p => p.id !== productId));

      setSaveStatus({
        show: true,
        message: 'Produto excluído com sucesso!',
        type: 'success'
      });

      setTimeout(() => setSaveStatus({ show: false, message: '', type: '' }), 3000);
    }
  };

  const changeQuantity = (productId, amount) => {
    setProducts(products.map(p => {
      if (p.id === productId) {
        const newStock = p.stock + amount;
        if (newStock < 0) return p;
        
        return { ...p, stock: newStock };
      }
      return p;
    }));
  };

  const handleEditChange = (field, value) => {
    setEditingProduct({
      ...editingProduct,
      [field]: value
    });
  };

  const handleNewProductChange = (field, value) => {
    setNewProduct({
      ...newProduct,
      [field]: value
    });
  };

  if (loading) {
    return (
      <div className="inventory-manager loading">
        <div className="spinner"></div>
        <p>Carregando produtos...</p>
      </div>
    );
  }

  return (
    <div className="inventory-manager">
      <div className="inventory-header">
        <h2><FaBox /> Gerenciamento de Estoque</h2>
        <button 
          className="btn-add-product" 
          onClick={() => setShowAddForm(!showAddForm)}
        >
          {showAddForm ? <FaTimes /> : <FaPlus />} 
          {showAddForm ? 'Cancelar' : 'Adicionar Produto'}
        </button>
      </div>

      {saveStatus.show && (
        <div className={`save-status ${saveStatus.type}`}>
          {saveStatus.message}
        </div>
      )}

      {/* Formulário para adicionar novo produto */}
      {showAddForm && (
        <div className="add-product-form">
          <h3>Adicionar Novo Produto</h3>
          <div className="form-grid">
            <div className="form-group">
              <label>Nome do Produto *</label>
              <input 
                type="text" 
                value={newProduct.name}
                onChange={(e) => handleNewProductChange('name', e.target.value)}
              />
            </div>
            
            <div className="form-group">
              <label>Categoria</label>
              <select
                value={newProduct.category}
                onChange={(e) => handleNewProductChange('category', e.target.value)}
              >
                <option value="">Selecione uma categoria</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
            
            <div className="form-group">
              <label>Marca/Fabricante</label>
              <input 
                type="text" 
                value={newProduct.brand}
                onChange={(e) => handleNewProductChange('brand', e.target.value)}
              />
            </div>
            
            <div className="form-group">
              <label>Preço (R$) *</label>
              <input 
                type="number" 
                step="0.01" 
                min="0" 
                value={newProduct.price}
                onChange={(e) => handleNewProductChange('price', e.target.value)}
              />
            </div>
            
            <div className="form-group">
              <label>Estoque Atual *</label>
              <input 
                type="number"
                min="0"
                value={newProduct.stock}
                onChange={(e) => handleNewProductChange('stock', e.target.value)}
              />
            </div>
            
            <div className="form-group">
              <label>Alerta de Estoque Baixo</label>
              <input 
                type="number"
                min="1"
                value={newProduct.alertThreshold}
                onChange={(e) => handleNewProductChange('alertThreshold', e.target.value)}
                placeholder="Ex: 5"
              />
            </div>
            
            <div className="form-group full-width">
              <label>Descrição</label>
              <textarea 
                value={newProduct.description}
                onChange={(e) => handleNewProductChange('description', e.target.value)}
                rows="3"
              />
            </div>
            
            <div className="form-group full-width">
              <label>URL da Imagem (opcional)</label>
              <input 
                type="text" 
                value={newProduct.image || ''}
                onChange={(e) => handleNewProductChange('image', e.target.value)}
                placeholder="https://exemplo.com/imagem.jpg"
              />
            </div>
          </div>
          
          <div className="form-actions">
            <button className="btn-cancel" onClick={() => setShowAddForm(false)}>
              <FaTimes /> Cancelar
            </button>
            <button className="btn-save" onClick={handleAddProduct}>
              <FaSave /> Salvar Produto
            </button>
          </div>
        </div>
      )}

      {/* Barra de pesquisa e filtros */}
      <div className="inventory-filters">
        <div className="search-box">
          <FaSearch className="search-icon" />
          <input 
            type="text" 
            placeholder="Buscar produtos..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Lista de Produtos */}
      <div className="products-list">
        {filteredProducts.length === 0 ? (
          <div className="no-products">
            <p>Nenhum produto encontrado. {searchQuery ? 'Tente outra busca.' : 'Adicione produtos ao seu inventário.'}</p>
          </div>
        ) : (
          filteredProducts.map(product => (
            <div 
              key={product.id} 
              className={`product-card ${product.stock <= product.alertThreshold ? 'low-stock' : ''}`}
            >
              {product.stock <= product.alertThreshold && (
                <div className="stock-alert">
                  <FaExclamationTriangle /> Estoque Baixo
                </div>
              )}
              
              {editingProduct && editingProduct.id === product.id ? (
                <div className="product-edit-form">
                  <div className="edit-header">
                    <h3>Editando Produto</h3>
                    <div className="edit-actions">
                      <button className="btn-cancel" onClick={cancelEditing}>
                        <FaTimes />
                      </button>
                      <button className="btn-save" onClick={saveEditing}>
                        <FaSave />
                      </button>
                    </div>
                  </div>
                  
                  <div className="edit-fields">
                    <div className="form-group">
                      <label>Nome *</label>
                      <input 
                        type="text" 
                        value={editingProduct.name}
                        onChange={(e) => handleEditChange('name', e.target.value)}
                      />
                    </div>
                    
                    <div className="form-group">
                      <label>Categoria</label>
                      <select
                        value={editingProduct.category}
                        onChange={(e) => handleEditChange('category', e.target.value)}
                      >
                        <option value="">Selecione uma categoria</option>
                        {categories.map(category => (
                          <option key={category} value={category}>{category}</option>
                        ))}
                      </select>
                    </div>
                    
                    <div className="form-group">
                      <label>Marca/Fabricante</label>
                      <input 
                        type="text" 
                        value={editingProduct.brand}
                        onChange={(e) => handleEditChange('brand', e.target.value)}
                      />
                    </div>
                    
                    <div className="form-group">
                      <label>Preço (R$) *</label>
                      <input 
                        type="number" 
                        step="0.01" 
                        min="0" 
                        value={editingProduct.price}
                        onChange={(e) => handleEditChange('price', e.target.value)}
                      />
                    </div>
                    
                    <div className="form-group">
                      <label>Estoque *</label>
                      <input 
                        type="number"
                        min="0"
                        value={editingProduct.stock}
                        onChange={(e) => handleEditChange('stock', e.target.value)}
                      />
                    </div>
                    
                    <div className="form-group">
                      <label>Alerta Estoque</label>
                      <input 
                        type="number"
                        min="1"
                        value={editingProduct.alertThreshold}
                        onChange={(e) => handleEditChange('alertThreshold', e.target.value)}
                      />
                    </div>
                    
                    <div className="form-group full-width">
                      <label>Descrição</label>
                      <textarea 
                        value={editingProduct.description}
                        onChange={(e) => handleEditChange('description', e.target.value)}
                        rows="2"
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  <div className="product-image">
                    {product.image ? (
                      <img src={product.image} alt={product.name} />
                    ) : (
                      <div className="product-no-image">
                        <FaBox />
                      </div>
                    )}
                  </div>
                  
                  <div className="product-info">
                    <div className="product-header">
                      <h3>{product.name}</h3>
                      <div className="product-price">R$ {product.price.toFixed(2)}</div>
                    </div>
                    
                    <div className="product-details">
                      {product.category && <div className="product-category">{product.category}</div>}
                      {product.brand && <div className="product-brand">{product.brand}</div>}
                    </div>
                    
                    <div className="product-description">{product.description}</div>
                    
                    <div className="product-stock">
                      <span className="stock-label">Estoque:</span>
                      <span className="stock-value">{product.stock} unid.</span>
                      <div className="stock-actions">
                        <button className="btn-stock-adjust" onClick={() => changeQuantity(product.id, -1)}>
                          <FaMinus />
                        </button>
                        <button className="btn-stock-adjust" onClick={() => changeQuantity(product.id, 1)}>
                          <FaPlus />
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="product-actions">
                    <button className="btn-edit" onClick={() => startEditing(product)}>
                      <FaPen />
                    </button>
                    <button className="btn-delete" onClick={() => deleteProduct(product.id)}>
                      <FaTrash />
                    </button>
                  </div>
                </>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default InventoryManager; 