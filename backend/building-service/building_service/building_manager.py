from sqlalchemy import Column, Integer, String, Date, Text, create_engine, ForeignKey
from sqlalchemy.orm import relationship, sessionmaker
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class Provider(Base):
    __tablename__ = 'providers'
    
    provider_id = Column(Integer, primary_key=True, autoincrement=True)
    provider_name = Column(String(100), nullable=False)
    contact_person = Column(String(100), nullable=False)
    contact_email = Column(String(100), nullable=False)
    contact_phone = Column(String(15), nullable=False)
    
    contracts = relationship('Contract', back_populates='provider')

class Contract(Base):
    __tablename__ = 'contracts'
    
    contract_id = Column(Integer, primary_key=True, autoincrement=True)
    company_name = Column(String(100), nullable=False)
    contact_name = Column(String(100), nullable=False)
    start_date = Column(Date, nullable=False)
    end_date = Column(Date, nullable=False)
    status = Column(String(50), nullable=False)
    special_terms = Column(Text)
    provider_id = Column(Integer, ForeignKey('providers.provider_id'))
    
    provider = relationship('Provider', back_populates='contracts')


engine = create_engine('sqlite:///service_contracts.db')
Base.metadata.create_all(engine)

Session = sessionmaker(bind=engine)
session = Session()
