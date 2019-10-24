using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using NationalInstruments;
using NationalInstruments.DAQmx;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace fyrpSol
{
    [Route("api/[controller]")]
    [ApiController]
    public class ValuesController : Controller
    {
        // GET: api/<controller>
        [HttpGet]
        public void Get()
        {
        }

        // POST: api/<controller>
        [HttpPost]
        public void Post([FromBody] string command)
        {
            if (command == "forward") {
                //FORWARD WHEELCHAIR
                Console.WriteLine("Going Forward...");
                double Voltagevalue0, Voltagevalue1;

                Voltagevalue0 = 2.77;
                Voltagevalue1 = 2.5;

                NationalInstruments.DAQmx.Task analogOut0 = new NationalInstruments.DAQmx.Task();
                NationalInstruments.DAQmx.Task analogOut1 = new NationalInstruments.DAQmx.Task();

                AOChannel ChanelAO0, ChanelAO1;

                ChanelAO0 = analogOut0.AOChannels.CreateVoltageChannel("dev2/ao0", "ChanelAO0", 0, 5, AOVoltageUnits.Volts);
                ChanelAO1 = analogOut1.AOChannels.CreateVoltageChannel("dev2/ao1", "ChanelAO1", 0, 5, AOVoltageUnits.Volts);

                AnalogSingleChannelWriter writer0 = new AnalogSingleChannelWriter(analogOut0.Stream);

                writer0.WriteSingleSample(true, Voltagevalue0);


                AnalogSingleChannelWriter writer1 = new AnalogSingleChannelWriter(analogOut1.Stream);

                writer1.WriteSingleSample(true, Voltagevalue1);
            } else if (command == "backward")
            {
                //BACKWARD WHEELCHAIR
                Console.WriteLine("Going Backward...");
                double Voltagevalue0, Voltagevalue1;

                Voltagevalue0 = 2.24;
                Voltagevalue1 = 2.5;

                NationalInstruments.DAQmx.Task analogOut0 = new NationalInstruments.DAQmx.Task();
                NationalInstruments.DAQmx.Task analogOut1 = new NationalInstruments.DAQmx.Task();

                AOChannel ChanelAO0, ChanelAO1;

                ChanelAO0 = analogOut0.AOChannels.CreateVoltageChannel("dev2/ao0", "ChanelAO0", 0, 5, AOVoltageUnits.Volts);
                ChanelAO1 = analogOut1.AOChannels.CreateVoltageChannel("dev2/ao1", "ChanelAO1", 0, 5, AOVoltageUnits.Volts);

                AnalogSingleChannelWriter writer0 = new AnalogSingleChannelWriter(analogOut0.Stream);

                writer0.WriteSingleSample(true, Voltagevalue0);


                AnalogSingleChannelWriter writer1 = new AnalogSingleChannelWriter(analogOut1.Stream);

                writer1.WriteSingleSample(true, Voltagevalue1);
            } else if(command == "left")
            {
                //LEFT WHEELCHAIR
                Console.WriteLine("Going Left...");
                double Voltagevalue0, Voltagevalue1;

                Voltagevalue0 = 2.5;
                Voltagevalue1 = 2.1;

                NationalInstruments.DAQmx.Task analogOut0 = new NationalInstruments.DAQmx.Task();
                NationalInstruments.DAQmx.Task analogOut1 = new NationalInstruments.DAQmx.Task();

                AOChannel ChanelAO0, ChanelAO1;

                ChanelAO0 = analogOut0.AOChannels.CreateVoltageChannel("dev2/ao0", "ChanelAO0", 0, 5, AOVoltageUnits.Volts);
                ChanelAO1 = analogOut1.AOChannels.CreateVoltageChannel("dev2/ao1", "ChanelAO1", 0, 5, AOVoltageUnits.Volts);

                AnalogSingleChannelWriter writer0 = new AnalogSingleChannelWriter(analogOut0.Stream);

                writer0.WriteSingleSample(true, Voltagevalue0);


                AnalogSingleChannelWriter writer1 = new AnalogSingleChannelWriter(analogOut1.Stream);

                writer1.WriteSingleSample(true, Voltagevalue1);
            } else if(command == "right")
            {
                //RIGHT WHEELCHAIR
                Console.WriteLine("Going Right...");
                double Voltagevalue0, Voltagevalue1;

                Voltagevalue0 = 2.5;
                Voltagevalue1 = 2.8;

                NationalInstruments.DAQmx.Task analogOut0 = new NationalInstruments.DAQmx.Task();
                NationalInstruments.DAQmx.Task analogOut1 = new NationalInstruments.DAQmx.Task();

                AOChannel ChanelAO0, ChanelAO1;

                ChanelAO0 = analogOut0.AOChannels.CreateVoltageChannel("dev2/ao0", "ChanelAO0", 0, 5, AOVoltageUnits.Volts);
                ChanelAO1 = analogOut1.AOChannels.CreateVoltageChannel("dev2/ao1", "ChanelAO1", 0, 5, AOVoltageUnits.Volts);

                AnalogSingleChannelWriter writer0 = new AnalogSingleChannelWriter(analogOut0.Stream);

                writer0.WriteSingleSample(true, Voltagevalue0);


                AnalogSingleChannelWriter writer1 = new AnalogSingleChannelWriter(analogOut1.Stream);

                writer1.WriteSingleSample(true, Voltagevalue1);

            } else if(command == "stop")
            {
                //STOP WHEELCHAIR
                Console.WriteLine("Stopping...");
                double Voltagevalue0, Voltagevalue1;

                Voltagevalue0 = 2.5;
                Voltagevalue1 = 2.5;

                NationalInstruments.DAQmx.Task analogOut0 = new NationalInstruments.DAQmx.Task();
                NationalInstruments.DAQmx.Task analogOut1 = new NationalInstruments.DAQmx.Task();

                AOChannel ChanelAO0, ChanelAO1;

                ChanelAO0 = analogOut0.AOChannels.CreateVoltageChannel("dev2/ao0", "ChanelAO0", 0, 5, AOVoltageUnits.Volts);
                ChanelAO1 = analogOut1.AOChannels.CreateVoltageChannel("dev2/ao1", "ChanelAO1", 0, 5, AOVoltageUnits.Volts);

                AnalogSingleChannelWriter writer0 = new AnalogSingleChannelWriter(analogOut0.Stream);

                writer0.WriteSingleSample(true, Voltagevalue0);


                AnalogSingleChannelWriter writer1 = new AnalogSingleChannelWriter(analogOut1.Stream);

                writer1.WriteSingleSample(true, Voltagevalue1);

            } else
            {
                //STOP WHEELCHAIR
                Console.WriteLine("[else] Stopping...");
                double Voltagevalue0, Voltagevalue1;

                Voltagevalue0 = 2.5;
                Voltagevalue1 = 2.5;

                NationalInstruments.DAQmx.Task analogOut0 = new NationalInstruments.DAQmx.Task();
                NationalInstruments.DAQmx.Task analogOut1 = new NationalInstruments.DAQmx.Task();

                AOChannel ChanelAO0, ChanelAO1;

                ChanelAO0 = analogOut0.AOChannels.CreateVoltageChannel("dev2/ao0", "ChanelAO0", 0, 5, AOVoltageUnits.Volts);
                ChanelAO1 = analogOut1.AOChannels.CreateVoltageChannel("dev2/ao1", "ChanelAO1", 0, 5, AOVoltageUnits.Volts);

                AnalogSingleChannelWriter writer0 = new AnalogSingleChannelWriter(analogOut0.Stream);

                writer0.WriteSingleSample(true, Voltagevalue0);


                AnalogSingleChannelWriter writer1 = new AnalogSingleChannelWriter(analogOut1.Stream);

                writer1.WriteSingleSample(true, Voltagevalue1);

            }

            //if (details.username == "WillQ" && details.password == "1234")
            //{
            //    return "Login Success";
            //} else
            //{
            //    return "Login Error";
            //}
        }
  }
}
