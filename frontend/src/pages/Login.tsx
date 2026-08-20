import { useState, FormEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function Login() {

  const [email, setEmail] = useState('');
  const [senha, setSenha]= useState('');

  const [mensagem, setMensagem] = useState('');
  const [erro, setErro] = useState('');

  async function handleLogin(e: FormEvent) {
    e.preventDefault();
    setMensagem('');
    setErro('');

    try{
        const resposta = await fetch('http://localhost:3333/login', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ Email: email, Senha: senha })
        });

        const dados = await resposta.json();

        if (resposta.ok) {
          setMensagem(`Bem vindo ${dados.usuario.Nome}!`);
          localStorage.setItem('meu_token', dados.token);
        } else {
          setErro(dados.erro);
        } 
    } catch (err) {
          setErro("Erro de conexão. O servidor está ligado?");
        }
  }

  return(
    <div className='min-h-dvh  bg-gradient-to-r from-sky-200 via-blue-300 to-blue-500 animate-gradient-bg  flex items-center justify-center p-4 '>
      <div className='bg-white/70 p-8 rounded-xl shadow-lg w-full max-w-md  '>
        <h2 className='text-2xl font-bold text-center text-gray-800 mb-6'>
          Acessar o Marketplace
        </h2>

        <form onSubmit={handleLogin} className='space-y-4'>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-1'>E-mail</label>
                <input 
                type="email"
                className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none'
                placeholder='Digite seu E-mail'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                 />

            </div>
            <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>Senha</label>
                <input type="password"
                className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none'
                placeholder='Sua senha'
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                />
                <Link to="/recuperar-senha" className="text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors">Esqueceu sua senha?</Link>
            </div>

            <div className='min-h-5 flex items-center justify-center'>
              {erro && <p className='text-red-500 text-sm text-center font-medium'>{erro}</p>}
              {mensagem && <p className='text-green-500 text-sm txt-center font-medium'>{mensagem}</p>}
            </div>

            <button type='submit' 
            className='w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-colors'
            >
              Entrar
            </button>
            <div className='mt-2 text-center border-t border-gray-200 pt-6'>
              <p className='text-sm text-gray-600 mb-3'>Ainda não tem uma conta?</p>
              <Link to='/cadastro'
               className='block w-full bg-white border-2 border-blue-600 text-blue-600 hover:bg-blue-50 font-bold py-2 py-4 rounded-lg transition-colors text-center'>
                Criar conta gratis
              </Link>
            </div>
        </form>

      </div>
    </div>
  );

}