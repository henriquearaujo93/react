import React from 'react';
import ProdutoService from '../../app/produtoService'

const estadoInicial = {
    nome: '',
    sku: '',
    descricao: '',
    preco: 0,
    fornecedor: '',
    sucesso: false,
    errors: []
}

export default class CadastroProduto extends React.Component {

    state = estadoInicial;

    constructor(){
        super()
        this.service = new ProdutoService();
    }

    onChange = (event) => {
        const valor = event.target.value;
        const nomeDoCampo = event.target.name;
        this.setState({ [nomeDoCampo]: valor });
    }

    onSubmit = (event) => {
        const produto = {
            nome: this.state.nome,
            sku: this.state.sku,
            descricao: this.state.descricao,
            preco: this.state.preco,
            fornecedor: this.state.fornecedor
        }
        try {
            this.service.salvar(produto);
            this.limpaCampos();
            this.setState({ sucesso: true });
        } catch(erro){
            const errors = erro.errors
            this.setState({errors : errors})
        }
        
    }

    limpaCampos = () => {
        this.setState(estadoInicial);
    }

    render(){
        return(
            <div className="card">
                <div className="card-header">
                    Cadastro de CadastroProduto
                </div>
                <div className="card-body">

                    { this.state.sucesso &&
                        
                        <div class="alert alert-dismissible alert-success">
                            <button type="button" class="close" data-dismiss="alert">&times;</button>
                            <a href="#" class="alert-link">Cadastro realizado com sucesso</a>.
                        </div>
                    }

                    { this.state.errors.length > 0 &&

                        this.state.errors.map( msg => {
                            return(
                                <div class="alert alert-dismissible alert-danger">
                                    <button type="button" class="close" data-dismiss="alert">&times;</button>
                                    <strong>Erro!</strong> {msg}
                                </div>
                            );
                        })
                    }
                    
                    <div className="row">
                        <div className="col-md-6">
                            <div className="form-group">
                                <label>Nome: *</label>
                                <input type="text" name="nome" value={this.state.nome} className="form-control" onChange={this.onChange}></input>
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="form-group">
                                <label>SKU: *</label>
                                <input type="text" name="sku" value={this.state.sku} className="form-control" onChange={this.onChange}></input>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-12">
                            <div className="form-group">
                                <label>Descrição:</label>
                                <textarea className="form-control" name="descricao" value={this.state.descricao} onChange={this.onChange}></textarea>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-6">
                            <div className="form-group">
                                <label>Preço: *</label>
                                <input type="text" name="preco" value={this.state.preco} className="form-control" onChange={this.onChange}></input>
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="form-group">
                                <label>Fornecedor: *</label>
                                <input type="text" name="fornecedor" value={this.state.forcenedor} className="form-control" onChange={this.onChange}></input>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-1">
                            <button onClick={this.onSubmit} className="btn btn-success">Salvar</button>
                        </div>

                        <div className="col-md-1">
                            <button onClick={this.limpaCampos} className="btn btn-primary">Limpar</button>
                        </div>

                    </div>

                </div>
            </div>
        );
    };
}