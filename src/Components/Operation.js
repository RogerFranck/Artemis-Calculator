import React,{Component} from 'react';
import '../App.css';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Fab from '@material-ui/core/Fab';
import SendIcon from '@material-ui/icons/Send';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import Grid from '@material-ui/core/Grid';


class Operation extends Component {

    constructor(props){
        super(props);
        this.state = {
            De: '',
            Para: '',
            Num:'',
            Num2:'',
            Res:'',
            operation:'',
            tipo2:'',
            switch:0
        }
        this.handleSelect = this.handleSelect.bind(this);
        this.handleClickOperation = this.handleClickOperation.bind(this);
        this.deploy = this.deploy.bind(this);
    }

    deploy(){
        let isChecked = document.getElementById('che').checked;
        if(isChecked){
            document.getElementById("SegundoSelect").style.display="none";
            document.getElementById("SegundoSelect2").style.display="grid";
            this.setState({
                switch:1,
                Res:''
            }) 
        }else{
            document.getElementById("SegundoSelect").style.display="grid";
            document.getElementById("SegundoSelect2").style.display="none";
            this.setState({
                switch:0,
                Res:''
            })
        }
    }

    handleSelect(e){
        const { value, name } = e.target;
        this.setState({
            [name]:value
        })  
    }

    handleClickOperation(){
        let num = this.state.Num;
        let De = this.state.De;
        let Para = this.state.Para;
        let nene = 0;

        //TODO A DECIMAL
        if (De===1) {
            nene = parseInt(num,2);    
        }else if (De===2) {
            nene = parseInt(num,8);
        }else if (De===3) {
            nene = parseInt(num,10);
        }else if (De===4) {
            nene = parseInt(num,16);
        } 

        num = nene;

        if (this.state.switch === 1 ) {

            let num2 = this.state.Num2;
            let nene2 = 0;
            let tipo2 = this.state.tipo2;

            if (tipo2===1) {
                nene2 = parseInt(num2,2);    
            }else if (tipo2===2) {
                nene2 = parseInt(num2,8);
            }else if (tipo2===3) {
                nene2 = parseInt(num2,10);
            }else if (tipo2===4) {
                nene2 = parseInt(num2,16);
            } 

            // nene = numero 1 en decimal
            // nene2 = ...

            let R = 0;

            if (this.state.operation===1) {
                //suma
                R = nene+nene2;
            }
            else if (this.state.operation===2) {
                //Resta
                R = nene-nene2;
            }
            else if (this.state.operation===3) {
                //multi
                R = nene*nene2;
            }
            else if (this.state.operation===4) {
                //divi
                R = nene/nene2;
            }

            this.setState({
                Res: R
            })
            
                
        num = R;
        
        }
        
        //Binario
        if (Para === 1) {
            let numFinal = [];
            let aux = 0;
            while(num !==0){
                aux = num%2;
                num = Math.trunc(num/2);
                if(aux === 0){
                    numFinal.push(0);
                }
                else{
                   numFinal.push(1);
                }
            }
            numFinal.reverse()
            let ResFinal="";
            for(let i= 0; i<numFinal.length;i++){
                ResFinal = ResFinal + numFinal[i];
            }
            this.setState({
                Res:ResFinal
            })
        }
        //OCTAL
        if (Para === 2) {
            let numFinal = [];
            let aux = 0;
            let sobrante =0;
            while(num!==0){
                aux = Math.trunc(num/8);
                sobrante = num - (aux*8);
                numFinal.push(sobrante);
                num = aux;
            }
            numFinal.reverse()
            let ResFinal="";
            for(let i= 0; i<numFinal.length;i++){
                ResFinal = ResFinal + numFinal[i];
            }
            this.setState({
                Res:ResFinal
            })
        }
        //Decimal
        if (Para === 3) {
            this.setState({
                Res:num
            })
        }
        //Hexadecimal
        if (Para === 4) {
            let numFinal = [];
            let aux = 0;
            let sobrante =0;
            let hexa = ["A", "B", "C", "D", "E", "F"]
            while(num!==0){
                aux = Math.trunc(num/16);
                sobrante = num - (aux*16);
                if(sobrante>=0 && sobrante<=9){
                    numFinal.push(sobrante);
                }
                else if (sobrante>9 && sobrante<=15){
                    numFinal.push(hexa[sobrante-10]);
                }
                num = aux;
            }
            numFinal.reverse()
            let ResFinal="";
            for(let i= 0; i<numFinal.length;i++){
                ResFinal = ResFinal + numFinal[i];
            }
            this.setState({
                Res:ResFinal
            })
        }
    }

    render(){
        return(
            <div className="Menu">
                <Card className="Card">
                <div className="headcolor"></div>
                    <CardContent>
                        <form autoComplete="off">
                        <FormControlLabel
                            control={
                                <Switch
                                    value="checkedA"
                                    color="primary"
                                    onChange={this.deploy}
                                    id="che"
                                />
                            }
                            label="Operaciones"
                            />
                            <div id="SegundoSelect">   
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={4}>
                                        <TextField 
                                            id="outlined-basic" 
                                            name="Num"
                                            label="Numero" 
                                            variant="outlined" 
                                            type="text" 
                                            fullWidth
                                            onChange={this.handleSelect} 
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={4} >
                                        <FormControl variant="outlined" fullWidth >
                                            <InputLabel>
                                                De
                                            </InputLabel>
                                            <Select 
                                                value={this.state.De}
                                                onChange={this.handleSelect}
                                                name="De"
                                            >
                                                <MenuItem value={1}>Binario</MenuItem>
                                                <MenuItem value={2}>Octal</MenuItem>
                                                <MenuItem value={3}>Decimal</MenuItem>
                                                <MenuItem value={4}>Hexadecimal</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                        <FormControl variant="outlined"  fullWidth >
                                            <InputLabel>
                                                Para
                                            </InputLabel>
                                            <Select 
                                                value={this.state.Para}
                                                onChange={this.handleSelect}
                                                name="Para"
                                            >
                                                <MenuItem value={1}>Binario</MenuItem>
                                                <MenuItem value={2}>Octal</MenuItem>
                                                <MenuItem value={3}>Decimal</MenuItem>
                                                <MenuItem value={4}>Hexadecimal</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                </Grid>
                            </div>
                            <div id="SegundoSelect2">
                            <br></br>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={6}>
                                        <TextField 
                                            id="coco2" 
                                            name="Num"
                                            label="Numero" 
                                            variant="outlined" 
                                            type="text" 
                                            fullWidth
                                            onChange={this.handleSelect}
                                        />                                    
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <FormControl variant="outlined" fullWidth >
                                            <InputLabel>
                                                Tipo
                                            </InputLabel>
                                            <Select 
                                                value={this.state.De}
                                                onChange={this.handleSelect}
                                                name="De"
                                            >
                                                <MenuItem value={1}>Binario</MenuItem>
                                                <MenuItem value={2}>Octal</MenuItem>
                                                <MenuItem value={3}>Decimal</MenuItem>
                                                <MenuItem value={4}>Hexadecimal</MenuItem>
                                            </Select>
                                        </FormControl>                                        
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <FormControl variant="outlined"  fullWidth >
                                            <InputLabel>
                                                Operación
                                            </InputLabel>
                                            <Select 
                                                value={this.state.operation}
                                                onChange={this.handleSelect}
                                                name="operation"
                                            >
                                                <MenuItem value={1}>Suma</MenuItem>
                                                <MenuItem value={2}>Resta</MenuItem>
                                                <MenuItem value={3}>Multipliacion</MenuItem>
                                                <MenuItem value={4}>División</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <FormControl variant="outlined"  fullWidth >
                                            <InputLabel>
                                                Resultado en
                                            </InputLabel>
                                            <Select 
                                                value={this.state.Para}
                                                onChange={this.handleSelect}
                                                name="Para"
                                            >
                                                <MenuItem value={1}>Binario</MenuItem>
                                                <MenuItem value={2}>Octal</MenuItem>
                                                <MenuItem value={3}>Decimal</MenuItem>
                                                <MenuItem value={4}>Hexadecimal </MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                </Grid><br></br>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={6}>
                                        <TextField 
                                            id="coco" 
                                            name="Num2"
                                            label="Numero" 
                                            variant="outlined" 
                                            type="text" 
                                            fullWidth
                                            onChange={this.handleSelect}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <FormControl variant="outlined" fullWidth >
                                            <InputLabel>
                                                Tipo
                                            </InputLabel>
                                            <Select 
                                                value={this.state.tipo2}
                                                onChange={this.handleSelect}
                                                name="tipo2"
                                            >
                                                <MenuItem value={1}>Binario</MenuItem>
                                                <MenuItem value={2}>Octal</MenuItem>
                                                <MenuItem value={3}>Decimal</MenuItem>
                                                <MenuItem value={4}>Hexadecimal</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                </Grid>                                
                            </div>
                            <br></br>
                            <div> 
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={9}> 
                                        <TextField 
                                            label="Resultado" 
                                            variant="outlined" 
                                            type="Text" 
                                            disabled
                                            value={this.state.Res}
                                            fullWidth
                                        />
                                        </Grid>
                                        <Grid item xs={12} sm={3}> 
                                            <center>
                                            <Fab color="primary" aria-label="Send" onClick={this.handleClickOperation} >
                                                <SendIcon />
                                            </Fab>
                                            </center>
                                        </Grid>
                                </Grid>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        );
    }
}

export default Operation;