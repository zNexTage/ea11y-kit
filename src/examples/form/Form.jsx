import Week from "../../lib/fields/week";
import Checkbox from "../../lib/fields/checkbox/Checkbox";
import Color from "../../lib/fields/color/Color";
import Month from "../../lib/fields/month/Month";
import Textbox from "../../lib/fields/textbox"
import Phone from "../../lib/fields/phone/Phone";
import RadioButton from "../../lib/fields/radio-button/RadioButton";
import Range from "../../lib/fields/range/Range";
import Select from "../../lib/fields/select";
import Textarea from "../../lib/fields/textarea/Textarea";
import UploadField from "../../lib/fields/upload-field/UploadField";
import Button from "../../lib/fields/button/Button";

const Form = () => {
    const onSubmit = event => {
        event.preventDefault();

        const formData = new FormData(event.target);

        formData.forEach(data => {
            console.log(data);
        })
    }

    return (
        <form action="" onSubmit={onSubmit}>

            <fieldset>
                <legend>
                    Dados pessoais
                </legend>

                <UploadField
                    id="foto_perfil"
                    accept="image/png, image/jpeg"
                    label="Foto para perfil"
                    placeholder="teste"
                    multiple
                    acceptDescription="Anexe apenas PNG e JPEG"
                />

                <Textbox
                    id="txtNome"
                    label="Primeiro nome"
                    maxLength={50}
                    name="primeiro_nome"
                    type="text"
                    placeholder="Informe o seu primeiro nome"
                />

                <Textbox
                    id="txtEmail"
                    label="Email"
                    maxLength={50}
                    name="email"
                    type="email"
                    placeholder="Informe o seu email"
                />

                <Textbox
                    id="txtSenha"
                    label="Senha"
                    maxLength={50}
                    name="senha"
                    type="password"
                    placeholder="Informe a senha a ser utilizada na plataforma"
                />

                <Textbox
                    label="Data de nascimento"
                    type="date"
                    name="data_nascimento"
                    id="txtDataNascimento"
                    placeholder="Informe a sua data de nascimento"
                />


                <Phone
                    id="txtTelefone"
                    label="Informe o seu celular ou telefone fixo"
                    name="telefone"

                />

                <Color
                    id="cor_olhos"
                    label="Qual a cor dos seus olhos?"
                    name="cor_olhos"
                />

                <div>
                    <p style={{ marginBottom: "0" }}>Escolha a linguagem:</p>
                    <RadioButton
                        id="linguagem_php"
                        label="PHP"
                        name="linguagem"
                    />
                    <RadioButton
                        id="linguagem_c#"
                        label="C#"
                        name="linguagem"
                    />
                    <RadioButton
                        id="linguagem_javascript"
                        label="Javascript"
                        name="linguagem"
                    />
                </div>

                <Range
                    id="salario"
                    label="Salário"
                    name="salario"
                />

                <Select id="estado" label="Escolha um estado" name="estado">
                    <option value="sp" >
                        São Paulo
                    </option>
                    <option value="mg" >
                        Minas Gerais
                    </option>
                    <option value="rj" >
                        Rio de Janeiro
                    </option>
                </Select>

                <Textarea
                    id="txtDescricao"
                    label="Descrição"
                    name="descricao"
                    placeholder="Informe a descrição"

                />

                <Checkbox id="aceita_termos" label="Aceita os termos?" />
            </fieldset>

            <fieldset>
                <legend>
                    Agendamento
                </legend>

                <Month
                    id="txtMes"
                    label="Em qual mês você deseja nos visitar?"
                    name="mes" />

                <Week id="semana" label="Selecione a semana que você pretende comparecer" name="semana"
                    fallbackYearOptions={[
                        2024, 2023, 2022, 2021, 2020, 2019
                    ]} />


                <Textbox
                    label="Que dia e hora você quer nos visitar?"
                    type="datetime-local"
                    name="data_visita"
                    id="txtDataVisita"
                    placeholder="Informe o dia e hora você quer nos visitar"
                />

                <Textarea
                    label="Descreva o motivo da sua visita"
                    id="txtMotivoVisita"
                    name="motivo_visita"
                    required
                    placeholder="Informe o motivo da sua visita"
                />
            </fieldset>
            <Button type="submit">
                Enviar
            </Button>
        </form>
    )
}

export default Form;